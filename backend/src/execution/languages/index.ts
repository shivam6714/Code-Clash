import { cpp } from './cpp';
import { python } from './python';
import { java } from './java';
import { javascript } from './javascript';
import { LanguageAdapter, SupportedLanguage } from '../types';

export const getLanguageAdapter = (lang: SupportedLanguage): LanguageAdapter => {
  switch (lang) {
    case 'cpp': return cpp;
    case 'python': return python;
    case 'java': return java;
    case 'javascript': return javascript;
    default: throw new Error(`Unsupported language: ${lang}`);
  }
};
