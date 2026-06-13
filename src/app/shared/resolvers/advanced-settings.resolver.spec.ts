import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { advancedSettingsResolver } from './advanced-settings.resolver';

describe('advancedSettingsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => advancedSettingsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
