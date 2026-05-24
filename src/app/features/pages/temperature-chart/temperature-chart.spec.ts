import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideEchartsCore } from 'ngx-echarts';
import { vi } from 'vitest';

import { TemperatureChart } from './temperature-chart';

describe('TemperatureChart', () => {
  let component: TemperatureChart;
  let fixture: ComponentFixture<TemperatureChart>;
  let resizeObserverMock: unknown;

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
      imports: [TemperatureChart],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        provideEchartsCore({ echarts: () => import('echarts') }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TemperatureChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    (globalThis as unknown as Record<string, unknown>)['ResizeObserver'] = resizeObserverMock;
    vi.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
