import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { settingsResolver } from './settings-resolver';

describe('settingsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      settingsResolver(...resolverParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
