export interface ThemeOption {
  value: ThemeMode;
  label: string;
  icon: string;
}

export type ThemeMode = 'light' | 'auto' | 'dark';
