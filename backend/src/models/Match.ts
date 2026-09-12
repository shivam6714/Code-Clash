import mongoose, { Document, Schema } from 'mongoose';

export interface IMatchPlayer {
  userId: mongoose.Types.ObjectId;
  username: string;
  ratingBefore: number;
  ratingAfter: number;
  ratingChange: number;
  result: 'WIN' | 'LOSS' | 'DRAW';
}

export interface IMatch extends Document {
  battleId: string;
  problem: {
    problemId?: string;
    title: string;
    difficulty: string;
    slug?: string;
  };
  player1: IMatchPlayer;
  player2: IMatchPlayer;
  winnerUserId?: mongoose.Types.ObjectId | null;
  reason: string;
  startedAt?: Date;
  endedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const matchPlayerSchema = new Schema<IMatchPlayer>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    ratingBefore: { type: Number, required: true },
    ratingAfter: { type: Number, required: true },
    ratingChange: { type: Number, required: true },
    result: { type: String, enum: ['WIN', 'LOSS', 'DRAW'], required: true },
  },
  { _id: false }
);

const matchSchema = new Schema<IMatch>(
  {
    battleId: { type: String, required: true, index: true },
    problem: {
      problemId: { type: String },
      title: { type: String, required: true },
      difficulty: { type: String, default: 'Medium' },
      slug: { type: String },
    },
    player1: { type: matchPlayerSchema, required: true },
    player2: { type: matchPlayerSchema, required: true },
    winnerUserId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    reason: { type: String, default: '' },
    startedAt: { type: Date },
    endedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

matchSchema.index({ 'player1.userId': 1, createdAt: -1 });
matchSchema.index({ 'player2.userId': 1, createdAt: -1 });

export const Match = mongoose.model<IMatch>('Match', matchSchema);
