import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { applicationSettingsResolver } from './settings-resolver';
import { ApplicationSettings } from '../models/application-settings';

describe('applicationSettingsResolver', () => {
  const executeResolver: ResolveFn<ApplicationSettings[]> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => applicationSettingsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
