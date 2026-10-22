import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { systemTimeZonesResolver } from './system-resolver';
import { TimeZone } from '../interfaces/time-zone';

describe('systemTimeZonesResolver', () => {
  const executeResolver: ResolveFn<TimeZone[]> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => systemTimeZonesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
