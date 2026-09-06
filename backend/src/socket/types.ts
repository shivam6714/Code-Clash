export enum BattleState {
  WAITING = 'WAITING',
  COUNTDOWN = 'COUNTDOWN',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
  CANCELLED = 'CANCELLED'
}

export interface BattlePlayer {
  userId: string;
  username: string;
  socketId: string;
  rating?: number;
  hasSubmitted: boolean;
  connected: boolean;
  explicitlyLeft?: boolean;
  lastSubmissionAt?: number;
  lastRunAt?: number;
}

export interface BattleRoom {
  battleId: string;
  player1: BattlePlayer;
  player2: BattlePlayer;
  problem: any; // Mongoose Document / public problem details
  status: BattleState;
  startedAt?: number;
  endsAt?: number;
  winner?: string;
  eloData?: any;
  settled?: boolean;
  timerInterval?: NodeJS.Timeout;
  disconnectTimer?: NodeJS.Timeout;
}
