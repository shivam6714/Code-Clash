import mongoose, { Document, Schema } from 'mongoose';

export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export interface IExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface ITestCase {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface IProblem extends Document {
  title: string;
  slug: string;
  description: string;
  difficulty: Difficulty;
  topics: string[];
  constraints: string[];
  examples: IExample[];
  starterCode: Map<string, string>; // Map of language identifier -> code
  testCases: ITestCase[];
  timeLimit: number; // in milliseconds
  memoryLimit: number; // in megabytes
  isPublished: boolean;
  source?: {
    provider: string;
    externalId: string;
    externalUrl?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const exampleSchema = new Schema<IExample>({
  input: { type: String, required: true },
  output: { type: String, required: true },
  explanation: { type: String },
});

const testCaseSchema = new Schema<ITestCase>({
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true },
  isHidden: { type: Boolean, required: true, default: true },
});

const problemSchema = new Schema<IProblem>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    difficulty: {
      type: String,
      enum: Object.values(Difficulty),
      required: true,
    },
    topics: [{ type: String }],
    constraints: [{ type: String }],
    examples: [exampleSchema],
    starterCode: {
      type: Map,
      of: String,
      required: true,
      default: {},
    },
    testCases: [testCaseSchema],
    timeLimit: { type: Number, required: true, default: 2000 },
    memoryLimit: { type: Number, required: true, default: 256 },
    isPublished: { type: Boolean, required: true, default: false },
    source: {
      provider: { type: String },
      externalId: { type: String },
      externalUrl: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

problemSchema.index({ difficulty: 1 });
problemSchema.index({ topics: 1 });
problemSchema.index({ isPublished: 1 });
problemSchema.index({ 'source.provider': 1, 'source.externalId': 1 }, { unique: true, sparse: true });

export const Problem = mongoose.model<IProblem>('Problem', problemSchema);
