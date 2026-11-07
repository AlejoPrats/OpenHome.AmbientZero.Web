import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { vi } from 'vitest';

import { TemperatureChartComponent } from './temperature-chart.component';
import { ThemeService } from 'app/core/services/theme.service';
import { getTranslationModuleMock } from 'app/shared/mocks/translation-module.mock';

describe('TemperatureChart', () => {
  let component: TemperatureChartComponent;
  let fixture: ComponentFixture<TemperatureChartComponent>;
  let resizeObserverMock: unknown;

  const createComponent = async () => {
    fixture = TestBed.createComponent(TemperatureChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  };

  const getChartTheme = () =>
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

    await TestBed.configureTestingModule({
      imports: [TemperatureChartComponent, getTranslationModuleMock()],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ThemeService, useValue: { resolvedTheme: signal('dark') } },
        provideEchartsCore({ echarts: () => import('echarts') }),
      ],
    }).compileComponents();
  });

  afterEach(() => {
    (globalThis as unknown as Record<string, unknown>)['ResizeObserver'] = resizeObserverMock;
    vi.clearAllMocks();
  });

  it('should create', async () => {
    await createComponent();

    expect(component).toBeTruthy();
  });

  it('should draw the chart in the resolved theme', async () => {
    await createComponent();

    expect(getChartTheme()).toBe('dark');
  });
});
