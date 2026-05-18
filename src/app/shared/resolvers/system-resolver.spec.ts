import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { systemResolver } from './system-resolver';

describe('systemResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => systemResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
