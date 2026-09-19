import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { advancedSettingsResolver } from './advanced-settings.resolver';
import { AdvancedSettingsResponse } from '../interfaces/advanced-settings-response';

describe('advancedSettingsResolver', () => {
  const executeResolver: ResolveFn<AdvancedSettingsResponse> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => advancedSettingsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
