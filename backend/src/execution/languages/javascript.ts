import { LanguageAdapter } from '../types';

export const javascript: LanguageAdapter = {
  image: 'node:18-alpine',
  sourceFile: 'main.js',
  runCmd: 'node main.js',
};
