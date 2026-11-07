import { computed, inject, Injectable, signal } from '@angular/core';
import { TUI_DARK_MODE } from '@taiga-ui/core';

export type ThemeMode = 'light' | 'dark' | 'auto';

const VALID_THEME_MODES: ThemeMode[] = ['light', 'dark', 'auto'];

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly isOsDark = inject(TUI_DARK_MODE);
  readonly mode = signal<ThemeMode>(this.readStoredTheme());
  readonly resolvedTheme = computed(() => this.attr() ?? (this.isOsDark() ? 'dark' : 'light'));

  set(mode: ThemeMode) {
    this.mode.set(mode);
    localStorage.setItem('theme', mode);
  }

  /** value for tuiTheme attribute */
  attr(): 'light' | 'dark' | null {
    const m = this.mode();
    return m === 'auto' ? null : m;
  }

  private readStoredTheme(): ThemeMode {
    const stored = localStorage.getItem('theme') as ThemeMode;
    return VALID_THEME_MODES.includes(stored) ? stored : 'auto';
  }
}
