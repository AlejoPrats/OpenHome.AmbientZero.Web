import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, WritableSignal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { TUI_DARK_MODE } from '@taiga-ui/core';
import { vi } from 'vitest';

import { TemperatureChartComponent } from './temperature-chart.component';
import { ThemeMode, ThemeService } from 'app/core/services/theme.service';
import { getTranslationModuleMock } from 'app/shared/mocks/translation-module.mock';

describe('TemperatureChart', () => {
  let component: TemperatureChartComponent;
  let fixture: ComponentFixture<TemperatureChartComponent>;
  let resizeObserverMock: unknown;
  let systemDarkMode: WritableSignal<boolean>;

  const createComponent = async () => {
    fixture = TestBed.createComponent(TemperatureChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  };

  const chartTheme = () =>
    fixture.debugElement
      .query(By.directive(NgxEchartsDirective))
      .injector.get(NgxEchartsDirective)
      .theme();

  beforeEach(async () => {
    resizeObserverMock = (globalThis as unknown as Record<string, unknown>)['ResizeObserver'];

    (globalThis as unknown as Record<string, unknown>)['ResizeObserver'] = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    const mockActivatedRoute = {
      data: of({
        temperatureReadings: { measurements: [], minTemperature: 20, maxTemperature: 30 },
      }),
    };
    systemDarkMode = signal(false);

    await TestBed.configureTestingModule({
      imports: [TemperatureChartComponent, getTranslationModuleMock()],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: TUI_DARK_MODE, useValue: systemDarkMode },
        provideEchartsCore({ echarts: () => import('echarts') }),
      ],
    }).compileComponents();
  });

  afterEach(() => {
    (globalThis as unknown as Record<string, unknown>)['ResizeObserver'] = resizeObserverMock;
    localStorage.removeItem('theme');
    vi.clearAllMocks();
  });

  it('should create', async () => {
    await createComponent();

    expect(component).toBeTruthy();
  });

  it.each`
    mode       | systemIsDark | expectedTheme
    ${'auto'}  | ${false}     | ${'light'}
    ${'auto'}  | ${true}      | ${'dark'}
    ${'light'} | ${true}      | ${'light'}
    ${'dark'}  | ${false}     | ${'dark'}
  `(
    'should draw the chart $expectedTheme in $mode mode when the system is dark: $systemIsDark',
    async ({ mode, systemIsDark, expectedTheme }) => {
      TestBed.inject(ThemeService).set(mode as ThemeMode);
      systemDarkMode.set(systemIsDark);

      await createComponent();

      expect(chartTheme()).toBe(expectedTheme);
    },
  );
});
