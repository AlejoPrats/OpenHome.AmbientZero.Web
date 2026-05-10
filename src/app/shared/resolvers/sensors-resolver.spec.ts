import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { sensorsResolver } from './sensors-resolver';

describe('sensorsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => sensorsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
