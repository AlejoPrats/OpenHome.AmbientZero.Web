import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideEchartsCore } from 'ngx-echarts';

import { TemperatureChart } from './temperature-chart';

const mockActivatedRoute = {
  data: of({
    temperatureReadings: { measurements: [], minTemperature: 20, maxTemperature: 30 },
  }),
};

// jsdom does not implement ResizeObserver — provide a stub so ngx-echarts can initialise
(globalThis as unknown as Record<string, unknown>)['ResizeObserver'] = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('TemperatureChart', () => {
  let component: TemperatureChart;
  let fixture: ComponentFixture<TemperatureChart>;

  beforeEach(async () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
