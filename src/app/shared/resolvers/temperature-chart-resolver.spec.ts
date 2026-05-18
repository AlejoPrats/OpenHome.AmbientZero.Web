import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { temperatureChartResolver } from './temperature-chart-resolver';

describe('temperatureChartResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      temperatureChartResolver(...resolverParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
