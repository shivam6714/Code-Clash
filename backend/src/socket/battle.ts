import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { BattleState, BattleRoom, BattlePlayer } from './types';
import { selectBattleProblem } from './problemSelection';
import { removeUserFromQueue } from './matchmaking';
import { User } from '../models/User';

// In-memory battle storage
export const activeBattles = new Map<string, BattleRoom>();
export const userBattles = new Map<string, string>(); // userId -> battleId

export const calculateEloChange = (ratingA: number, ratingB: number, K: number = 32) => {
  const expectedScoreA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
  const expectedScoreB = 1 / (1 + Math.pow(10, (ratingA - ratingB) / 400));

  const winnerChange = Math.round(K * (1 - expectedScoreA));
  const loserChange = Math.round(K * (0 - expectedScoreB));

  const newRatingA = Math.max(0, ratingA + winnerChange);
  const newRatingB = Math.max(0, ratingB + loserChange);

  return {
    winnerEloBefore: ratingA,
    winnerEloAfter: newRatingA,
    winnerEloChange: newRatingA - ratingA,
    loserEloBefore: ratingB,
    loserEloAfter: newRatingB,
    loserEloChange: newRatingB - ratingB,
  };
};

const BATTLE_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const DISCONNECT_GRACE_PERIOD_MS = 10 * 1000; // 10 seconds

export const createBattle = async (io: Server, player1: BattlePlayer, player2: BattlePlayer) => {
  try {
    const problem = await selectBattleProblem();
    const battleId = uuidv4();

    const battle: BattleRoom = {
      battleId,
      player1,
      player2,
      problem,
      status: BattleState.WAITING,
    };

    activeBattles.set(battleId, battle);
    userBattles.set(player1.userId, battleId);
    userBattles.set(player2.userId, battleId);

    // Notify both players
    io.to(player1.socketId).emit('battle:created', { battleId });
    io.to(player2.socketId).emit('battle:created', { battleId });

    startCountdown(io, battle);
  } catch (error) {
    console.error('Failed to create battle:', error);
    // Ideally emit an error back to clients to return them to queue
  }
};

const startCountdown = (io: Server, battle: BattleRoom) => {
  battle.status = BattleState.COUNTDOWN;
  
  let count = 3;
  // Emit count = 3 immediately so clients enter countdown mode without delay
  io.to(battle.player1.socketId).emit('battle:countdown', { count });
  io.to(battle.player2.socketId).emit('battle:countdown', { count });

  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      io.to(battle.player1.socketId).emit('battle:countdown', { count });
      io.to(battle.player2.socketId).emit('battle:countdown', { count });
    } else {
      clearInterval(interval);
      startBattle(io, battle);
    }
  }, 1000);
};

const startBattle = (io: Server, battle: BattleRoom) => {
  battle.status = BattleState.ACTIVE;
  battle.startedAt = Date.now();
  battle.endsAt = battle.startedAt + BATTLE_DURATION_MS;

  const payload = {
    battleId: battle.battleId,
    problem: battle.problem,
    startedAt: battle.startedAt,
    endsAt: battle.endsAt,
    player1: { username: battle.player1.username },
    player2: { username: battle.player2.username }
  };

  io.to(battle.player1.socketId).emit('battle:started', payload);
  io.to(battle.player2.socketId).emit('battle:started', payload);

  battle.timerInterval = setTimeout(() => {
    endBattle(io, battle, 'Timeout');
  }, BATTLE_DURATION_MS);
};

import { executeSubmission, executeRun } from '../execution/runner';
import { SubmissionStatus } from '../execution/types';

export const handleBattleEvents = (io: Server, socket: Socket) => {
  const userId = (socket as any).userId;

  socket.on('battle:submit', async (data: { sourceCode: string, language: any }) => {
    const battleId = userBattles.get(userId);
    if (!battleId) return;

    const battle = activeBattles.get(battleId);
    if (!battle || battle.status !== BattleState.ACTIVE) return;

    if (Date.now() >= (battle.endsAt || 0)) {
       return socket.emit('battle:submission-result', { status: 'SYSTEM_ERROR', errorMessage: 'Battle has ended' });
    }

    const player = battle.player1.userId === userId ? battle.player1 : battle.player2;
    const opponent = battle.player1.userId === userId ? battle.player2 : battle.player1;

    // Rate limiting: 2 seconds
    const now = Date.now();
    if (player.lastSubmissionAt && now - player.lastSubmissionAt < 2000) {
      return socket.emit('battle:submission-result', { status: 'RATE_LIMITED', errorMessage: 'Please wait before submitting again.' });
    }
    player.lastSubmissionAt = now;

    // Notify opponent
    io.to(opponent.socketId).emit('battle:opponent-status', { status: 'Judging...' });
    
    // Determine language and execute
    const { sourceCode, language } = data;
    const supportedLangs = ['cpp', 'python', 'java', 'javascript'];
    if (!supportedLangs.includes(language)) {
       return socket.emit('battle:submission-result', { status: 'SYSTEM_ERROR', errorMessage: 'Invalid language' });
    }

    const result = await executeSubmission(sourceCode, language, battle.problem.testCases);

    socket.emit('battle:submission-result', result);

    if (result.status === SubmissionStatus.ACCEPTED && battle.status === BattleState.ACTIVE) {
      // Winner!
      await endBattle(io, battle, `${player.username} has solved the problem!`, player.userId);
    } else {
      io.to(opponent.socketId).emit('battle:opponent-status', { status: 'Connected' });
    }
  });

  socket.on('battle:run', async (data: { sourceCode: string, language: any }) => {
    const battleId = userBattles.get(userId);
    if (!battleId) return;

    const battle = activeBattles.get(battleId);
    if (!battle || battle.status !== BattleState.ACTIVE) return;

    const player = battle.player1.userId === userId ? battle.player1 : battle.player2;

    // Rate limiting for Run: 2 seconds independently from submit
    const now = Date.now();
    if (player.lastRunAt && now - player.lastRunAt < 2000) {
      return socket.emit('battle:run-result', { status: 'RATE_LIMITED', errorMessage: 'Please wait before running again.' });
    }
    player.lastRunAt = now;
    
    const { sourceCode, language } = data;
    const supportedLangs = ['cpp', 'python', 'java', 'javascript'];
    if (!supportedLangs.includes(language)) {
       return socket.emit('battle:run-result', { status: 'SYSTEM_ERROR', errorMessage: 'Invalid language' });
    }

    // Filter test cases to only visible ones (isHidden === false)
    const visibleTestCases = battle.problem.testCases.filter((tc: any) => tc.isHidden === false);

    const result = await executeRun(sourceCode, language, visibleTestCases);

    socket.emit('battle:run-result', result);
  });

  socket.on('battle:get-active', () => {
    const battleId = userBattles.get(userId);
    if (!battleId) {
      return socket.emit('battle:active-status', { hasActiveBattle: false });
    }

    const battle = activeBattles.get(battleId);
    if (!battle || battle.settled || battle.status === BattleState.FINISHED || battle.status === BattleState.CANCELLED) {
      userBattles.delete(userId);
      return socket.emit('battle:active-status', { hasActiveBattle: false });
    }

    const player = battle.player1.userId === userId ? battle.player1 : battle.player2;
    if (player.explicitlyLeft) {
      userBattles.delete(userId);
      return socket.emit('battle:active-status', { hasActiveBattle: false });
    }

    socket.emit('battle:active-status', {
      hasActiveBattle: true,
      battleId: battle.battleId,
      status: battle.status,
      problemTitle: battle.problem?.title || 'Active Problem',
    });
  });

  socket.on('battle:rejoin', (data: { battleId: string }) => {
    const userBattleId = userBattles.get(userId);
    if (!userBattleId || userBattleId !== data.battleId) {
      return socket.emit('battle:rejoin-failed', { message: 'Invalid or inactive battle' });
    }

    const battle = activeBattles.get(data.battleId);
    if (!battle || battle.settled || battle.status === BattleState.FINISHED || battle.status === BattleState.CANCELLED) {
      return socket.emit('battle:rejoin-failed', { message: 'Battle has ended' });
    }

    const player = battle.player1.userId === userId ? battle.player1 : battle.player2;
    const opponent = battle.player1.userId === userId ? battle.player2 : battle.player1;

    if (player.explicitlyLeft) {
      return socket.emit('battle:rejoin-failed', { message: 'You have left this battle' });
    }

    player.socketId = socket.id;
    player.connected = true;

    if (battle.disconnectTimer) {
      clearTimeout(battle.disconnectTimer);
      battle.disconnectTimer = undefined;
    }

    if (battle.status === BattleState.ACTIVE) {
      socket.emit('battle:started', {
        battleId: battle.battleId,
        problem: battle.problem,
        startedAt: battle.startedAt,
        endsAt: battle.endsAt,
        player1: { username: player.username },
        player2: { username: opponent.username }
      });
    }

    io.to(opponent.socketId).emit('battle:opponent-status', { status: 'Connected' });
  });

  socket.on('battle:leave', () => {
    const battleId = userBattles.get(userId);
    if (!battleId) return;

    const battle = activeBattles.get(battleId);
    if (!battle || battle.settled || battle.status === BattleState.FINISHED || battle.status === BattleState.CANCELLED) return;

    const player = battle.player1.userId === userId ? battle.player1 : battle.player2;
    player.explicitlyLeft = true;

    handleAbandonment(io, battle, userId, true);
  });
};

export const handleDisconnect = (io: Server, socket: Socket) => {
  const userId = (socket as any).userId;
  
  // Remove from matchmaking if they were in it
  removeUserFromQueue(userId);

  const battleId = userBattles.get(userId);
  if (battleId) {
    const battle = activeBattles.get(battleId);
    if (battle && !battle.settled && (battle.status === BattleState.ACTIVE || battle.status === BattleState.WAITING || battle.status === BattleState.COUNTDOWN)) {
      const player = battle.player1.userId === userId ? battle.player1 : battle.player2;
      const opponent = battle.player1.userId === userId ? battle.player2 : battle.player1;
      
      if (player.explicitlyLeft) return;

      player.connected = false;
      io.to(opponent.socketId).emit('battle:opponent-status', { status: 'Disconnected' });

      // Grace period for unexpected reconnection
      if (battle.disconnectTimer) clearTimeout(battle.disconnectTimer);
      battle.disconnectTimer = setTimeout(() => {
        const currentBattle = activeBattles.get(battleId);
        if (currentBattle && !currentBattle.settled && !player.connected) {
           handleAbandonment(io, currentBattle, userId, false);
        }
      }, DISCONNECT_GRACE_PERIOD_MS);
    }
  }
};

const handleAbandonment = async (
  io: Server,
  battle: BattleRoom,
  abandonerUserId: string,
  isVoluntary: boolean
) => {
  if (battle.settled || battle.status === BattleState.FINISHED || battle.status === BattleState.CANCELLED) {
    return;
  }
  battle.settled = true;
  battle.status = BattleState.FINISHED;

  if (battle.timerInterval) clearTimeout(battle.timerInterval);
  if (battle.disconnectTimer) {
    clearTimeout(battle.disconnectTimer);
    battle.disconnectTimer = undefined;
  }

  const abandonerPlayer = battle.player1.userId === abandonerUserId ? battle.player1 : battle.player2;
  const opponentPlayer = battle.player1.userId === abandonerUserId ? battle.player2 : battle.player1;

  let eloData: any = null;

  try {
    const [abandonerUser, opponentUser] = await Promise.all([
      User.findById(abandonerPlayer.userId),
      User.findById(opponentPlayer.userId),
    ]);

    if (abandonerUser && opponentUser) {
      const abandonerEloBefore = abandonerUser.rating ?? 300;
      const opponentEloBefore = opponentUser.rating ?? 300;

      const abandonerEloAfter = Math.max(0, abandonerEloBefore - 5);
      const abandonerEloChange = abandonerEloBefore - abandonerEloAfter;

      const opponentEloAfter = opponentEloBefore;
      const opponentEloChange = 0;

      abandonerUser.rating = abandonerEloAfter;
      abandonerUser.losses = (abandonerUser.losses || 0) + 1;
      await abandonerUser.save();

      opponentUser.wins = (opponentUser.wins || 0) + 1;
      await opponentUser.save();

      eloData = {
        winnerId: opponentPlayer.userId,
        loserId: abandonerPlayer.userId,
        winnerUserId: opponentPlayer.userId,
        loserUserId: abandonerPlayer.userId,
        winnerEloBefore: opponentEloBefore,
        winnerEloAfter: opponentEloAfter,
        winnerEloChange: opponentEloChange,
        loserEloBefore: abandonerEloBefore,
        loserEloAfter: abandonerEloAfter,
        loserEloChange: abandonerEloChange,
        isAbandonment: true,
        isVoluntary,
      };
      battle.eloData = eloData;
    }
  } catch (err) {
    console.error('Failed to settle abandonment ELO:', err);
  }

  const abandonerReason = isVoluntary 
    ? 'You left the battle.' 
    : 'You disconnected and failed to reconnect.';
  const opponentReason = isVoluntary 
    ? 'Opponent left the battle.' 
    : 'Opponent disconnected and failed to reconnect.';

  const abandonerPayload = {
    reason: abandonerReason,
    winnerUserId: opponentPlayer.userId,
    eloData: eloData || battle.eloData || null,
  };

  const opponentPayload = {
    reason: opponentReason,
    winnerUserId: opponentPlayer.userId,
    eloData: eloData || battle.eloData || null,
  };

  io.to(abandonerPlayer.socketId).emit('battle:ended', abandonerPayload);
  io.to(opponentPlayer.socketId).emit('battle:ended', opponentPayload);

  cleanupBattle(battle.battleId);
};

const endBattle = async (io: Server, battle: BattleRoom, reason: string, winnerUserId?: string) => {
  // ATOMIC GUARD: Ensure endBattle is executed exactly once per battle
  if (battle.settled || battle.status === BattleState.FINISHED || battle.status === BattleState.CANCELLED) {
    return;
  }
  battle.settled = true;
  battle.status = BattleState.FINISHED;

  if (battle.timerInterval) clearTimeout(battle.timerInterval);
  if (battle.disconnectTimer) {
    clearTimeout(battle.disconnectTimer);
    battle.disconnectTimer = undefined;
  }

  let eloData: any = null;

  if (winnerUserId) {
    const winnerPlayer = battle.player1.userId === winnerUserId ? battle.player1 : battle.player2;
    const loserPlayer = battle.player1.userId === winnerUserId ? battle.player2 : battle.player1;

    try {
      const [winnerUser, loserUser] = await Promise.all([
        User.findById(winnerPlayer.userId),
        User.findById(loserPlayer.userId),
      ]);

      if (winnerUser && loserUser) {
        const winnerRating = winnerUser.rating ?? 300;
        const loserRating = loserUser.rating ?? 300;

        const eloCalc = calculateEloChange(winnerRating, loserRating, 32);

        winnerUser.rating = eloCalc.winnerEloAfter;
        winnerUser.highestRating = Math.max(winnerUser.highestRating ?? 300, eloCalc.winnerEloAfter);
        winnerUser.wins = (winnerUser.wins || 0) + 1;
        await winnerUser.save();

        loserUser.rating = eloCalc.loserEloAfter;
        loserUser.losses = (loserUser.losses || 0) + 1;
        await loserUser.save();

        eloData = {
          winnerId: winnerUserId,
          loserId: loserPlayer.userId,
          winnerUserId,
          loserUserId: loserPlayer.userId,
          winnerEloBefore: eloCalc.winnerEloBefore,
          winnerEloAfter: eloCalc.winnerEloAfter,
          winnerEloChange: eloCalc.winnerEloChange,
          loserEloBefore: eloCalc.loserEloBefore,
          loserEloAfter: eloCalc.loserEloAfter,
          loserEloChange: eloCalc.loserEloChange,
        };
        battle.eloData = eloData;
      }
    } catch (err) {
      console.error('Failed to calculate/save ELO:', err);
    }
  }

  const endPayload = {
    reason,
    winnerUserId: winnerUserId || null,
    eloData: eloData || battle.eloData || null,
  };

  io.to(battle.player1.socketId).emit('battle:ended', endPayload);
  io.to(battle.player2.socketId).emit('battle:ended', endPayload);

  cleanupBattle(battle.battleId);
};

const cancelBattle = (io: Server, battle: BattleRoom, leavingUserId: string) => {
  if (battle.settled || battle.status === BattleState.FINISHED || battle.status === BattleState.CANCELLED) {
    return;
  }
  battle.settled = true;
  battle.status = BattleState.CANCELLED;
  if (battle.timerInterval) clearTimeout(battle.timerInterval);
  if (battle.disconnectTimer) clearTimeout(battle.disconnectTimer);

  const opponent = battle.player1.userId === leavingUserId ? battle.player2 : battle.player1;
  io.to(opponent.socketId).emit('battle:opponent-left', { message: 'Opponent has left the battle.' });

  cleanupBattle(battle.battleId);
};

const cleanupBattle = (battleId: string) => {
  const battle = activeBattles.get(battleId);
  if (battle) {
    userBattles.delete(battle.player1.userId);
    userBattles.delete(battle.player2.userId);
    activeBattles.delete(battleId);
  }
};
