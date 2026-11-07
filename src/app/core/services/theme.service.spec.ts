import { TestBed } from '@angular/core/testing';
import { signal, WritableSignal } from '@angular/core';
import { TUI_DARK_MODE } from '@taiga-ui/core';

import { ThemeMode, ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let systemDarkMode: WritableSignal<boolean>;

  beforeEach(() => {
    systemDarkMode = signal(false);
    TestBed.configureTestingModule({
      providers: [{ provide: TUI_DARK_MODE, useValue: systemDarkMode }],
    });
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    localStorage.removeItem('theme');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it.each`
    mode       | systemIsDark | expectedTheme
    ${'auto'}  | ${false}     | ${'light'}
    ${'auto'}  | ${true}      | ${'dark'}
    ${'light'} | ${true}      | ${'light'}
    ${'dark'}  | ${false}     | ${'dark'}
  `(
    'should resolve $expectedTheme in $mode mode when the system is dark: $systemIsDark',
    ({ mode, systemIsDark, expectedTheme }) => {
      service.set(mode as ThemeMode);
      systemDarkMode.set(systemIsDark);

      expect(service.resolvedTheme()).toBe(expectedTheme);
    },
  );

  it('should follow the system when it changes in auto mode', () => {
    service.set('auto');
    expect(service.resolvedTheme()).toBe('light');

    systemDarkMode.set(true);

    expect(service.resolvedTheme()).toBe('dark');
  });
});
