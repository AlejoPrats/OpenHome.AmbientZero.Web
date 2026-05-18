import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'auto';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly mode = signal<ThemeMode>(
    (localStorage.getItem('theme') as ThemeMode) ?? 'auto',
  );

  set(mode: ThemeMode) {
    this.mode.set(mode);
    localStorage.setItem('theme', mode);
  }

  // value for tuiTheme attribute
  attr(): 'light' | 'dark' | null {
    const m = this.mode();
    return m === 'auto' ? null : m;
  }

  eChartsAttr(): 'light' | 'dark'  {
    const m = this.mode();
    return m === 'auto' ? 'dark' : m;
  }

}
