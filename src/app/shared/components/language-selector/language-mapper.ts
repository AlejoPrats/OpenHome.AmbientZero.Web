import { Language } from './language.enum';

export function mapLanguage(name: Language): string {
  const languageMap: Record<Language, string> | null = {
    [Language.english]: 'en',
    [Language.spanish]: 'es',
    [Language.default]: 'en',
  };

  return languageMap[name] ?? Language.default;
}

export function mapLanguageFromString(name: string): string {
  const language = Language[name as keyof typeof Language] ?? Language.default;
  return mapLanguage(language);
}
