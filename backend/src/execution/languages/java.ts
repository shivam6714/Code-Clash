import { LanguageAdapter } from '../types';

export const java: LanguageAdapter = {
  image: 'openjdk:17-alpine',
  sourceFile: 'Main.java',
  compileCmd: 'javac Main.java',
  runCmd: 'java Main',
};
