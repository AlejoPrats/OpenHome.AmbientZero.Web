import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { applicationSettingsResolver } from './settings-resolver';
import { ApplicationBasicSettings } from '../interfaces/application-basic-settings';

describe('applicationSettingsResolver', () => {
  const executeResolver: ResolveFn<ApplicationBasicSettings | undefined> = (
    ...resolverParameters
  ) => TestBed.runInInjectionContext(() => applicationSettingsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
