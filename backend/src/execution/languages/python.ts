import { LanguageAdapter } from '../types';

export const python: LanguageAdapter = {
  image: 'python:3.10-alpine',
  sourceFile: 'main.py',
  runCmd: 'python main.py',
};
