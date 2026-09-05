import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { BattleState, BattleRoom, BattlePlayer } from './types';
import { selectBattleProblem } from './problemSelection';
import { removeUserFromQueue } from './matchmaking';

// In-memory battle storage
export const activeBattles = new Map<string, BattleRoom>();
export const userBattles = new Map<string, string>(); // userId -> battleId

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
  const interval = setInterval(() => {
    if (count > 0) {
      io.to(battle.player1.socketId).emit('battle:countdown', { count });
      io.to(battle.player2.socketId).emit('battle:countdown', { count });
      count--;
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
      endBattle(io, battle, `${player.username} has solved the problem!`);
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

  socket.on('battle:leave', () => {
    const battleId = userBattles.get(userId);
    if (!battleId) return;

    const battle = activeBattles.get(battleId);
    if (!battle) return;

    cancelBattle(io, battle, userId);
  });
};

export const handleDisconnect = (io: Server, socket: Socket) => {
  const userId = (socket as any).userId;
  
  // Remove from matchmaking if they were in it
  removeUserFromQueue(userId);

  const battleId = userBattles.get(userId);
  if (battleId) {
    const battle = activeBattles.get(battleId);
    if (battle && (battle.status === BattleState.ACTIVE || battle.status === BattleState.WAITING || battle.status === BattleState.COUNTDOWN)) {
      const player = battle.player1.userId === userId ? battle.player1 : battle.player2;
      const opponent = battle.player1.userId === userId ? battle.player2 : battle.player1;
      
      player.connected = false;
      io.to(opponent.socketId).emit('battle:opponent-status', { status: 'Disconnected' });

      // Grace period for reconnection
      setTimeout(() => {
        const currentBattle = activeBattles.get(battleId);
        if (currentBattle && !player.connected) {
           cancelBattle(io, currentBattle, userId);
        }
      }, DISCONNECT_GRACE_PERIOD_MS);
    }
  }
};

const endBattle = (io: Server, battle: BattleRoom, reason: string) => {
  battle.status = BattleState.FINISHED;
  if (battle.timerInterval) clearTimeout(battle.timerInterval);

  io.to(battle.player1.socketId).emit('battle:ended', { reason });
  io.to(battle.player2.socketId).emit('battle:ended', { reason });

  cleanupBattle(battle.battleId);
};

const cancelBattle = (io: Server, battle: BattleRoom, leavingUserId: string) => {
  battle.status = BattleState.CANCELLED;
  if (battle.timerInterval) clearTimeout(battle.timerInterval);

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
