import { LanguageAdapter } from '../types';

export const cpp: LanguageAdapter = {
  image: 'gcc:13',
  sourceFile: 'main.cpp',
  compileCmd: 'g++ -O2 -o main main.cpp',
  runCmd: './main',
};
