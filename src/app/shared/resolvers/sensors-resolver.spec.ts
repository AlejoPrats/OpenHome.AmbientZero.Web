import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { sensorsResolver } from './sensors-resolver';
import { SensorInformationResponse } from '../interfaces/sensor-information-response';

describe('sensorsResolver', () => {
  const executeResolver: ResolveFn<SensorInformationResponse[]> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => sensorsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
