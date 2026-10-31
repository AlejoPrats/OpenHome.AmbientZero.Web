import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { provideEchartsCore } from 'ngx-echarts';
import { vi } from 'vitest';

import { TemperatureChartComponent } from './temperature-chart.component';
import { AmbientTemperatureService } from '../../../shared/services/ambient-temperature.service';
import { ChartResponse } from '../../../shared/interfaces/chart-response';
import { buildTemperatureChartOption } from './mapper/temperature-chart.mapper';

describe('TemperatureChart', () => {
  let component: TemperatureChartComponent;
  let fixture: ComponentFixture<TemperatureChartComponent>;
  let resizeObserverMock: unknown;
  let responses: Subject<ChartResponse>[];

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

    responses = [];
    const getDailyTemperatures = vi.fn(() => {
      const response = new Subject<ChartResponse>();
      responses.push(response);
      return response;
    });

    await TestBed.configureTestingModule({
      imports: [TemperatureChartComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: AmbientTemperatureService, useValue: { getDailyTemperatures } },
        provideEchartsCore({ echarts: () => import('echarts') }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TemperatureChartComponent);
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

  describe('when the date changes quickly', () => {
    let olderDay: ChartResponse;
    let newerDay: ChartResponse;

    beforeEach(() => {
      olderDay = { measurements: [], minTemperature: 10, maxTemperature: 15 };
      newerDay = { measurements: [], minTemperature: 18, maxTemperature: 24 };
    });

    const clickPreviousDay = () =>
      (fixture.nativeElement as HTMLElement)
        .querySelector<HTMLButtonElement>('#chart-previous-day')!
        .click();

    it('should show the newest date when an older response arrives last', () => {
      clickPreviousDay();
      clickPreviousDay();

      responses[1].next(newerDay);
      responses[0].next(olderDay);

      expect(component.options()).toEqual(buildTemperatureChartOption(newerDay));
    });
  });
});
