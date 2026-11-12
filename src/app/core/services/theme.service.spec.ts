import { TestBed } from '@angular/core/testing';
import { signal, WritableSignal } from '@angular/core';
import { TUI_DARK_MODE } from '@taiga-ui/core';

import { ThemeMode, ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let isOsDark: WritableSignal<boolean>;

  beforeEach(() => {
    isOsDark = signal(false);
    TestBed.configureTestingModule({
      providers: [{ provide: TUI_DARK_MODE, useValue: isOsDark }],
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
    selectedMode | osIsDark | expectedTheme
    ${'auto'}    | ${false} | ${'light'}
    ${'auto'}    | ${true}  | ${'dark'}
    ${'light'}   | ${true}  | ${'light'}
    ${'dark'}    | ${false} | ${'dark'}
  `(
    'should resolve $expectedTheme in $selectedMode mode when the OS is dark: $osIsDark',
    ({ selectedMode, osIsDark, expectedTheme }) => {
      service.set(selectedMode as ThemeMode);
      isOsDark.set(osIsDark);

      expect(service.resolvedTheme()).toBe(expectedTheme);
    },
  );

  it('should follow the OS when it changes in auto mode', () => {
    service.set('auto');
    expect(service.resolvedTheme()).toBe('light');

    isOsDark.set(true);

    expect(service.resolvedTheme()).toBe('dark');
  });
});
