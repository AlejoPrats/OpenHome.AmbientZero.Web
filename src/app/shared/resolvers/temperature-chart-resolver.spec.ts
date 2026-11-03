import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { temperatureChartResolver } from './temperature-chart-resolver';
import { ChartResponse } from '../interfaces/chart-response';

describe('temperatureChartResolver', () => {
  const executeResolver: ResolveFn<ChartResponse> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => temperatureChartResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
