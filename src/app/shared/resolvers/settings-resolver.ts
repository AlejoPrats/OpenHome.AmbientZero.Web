import { ResolveFn } from '@angular/router';
import { SettingsService } from '../services/settings.service';
import { inject } from '@angular/core';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { of } from 'rxjs';
import { ApplicationBasicSettings } from '../interfaces/application-basic-settings';

export const applicationSettingsResolver: ResolveFn<ApplicationBasicSettings | undefined> = (
  _route,
  _state,
) => {
  const localStorageService = inject(LocalStorageService);

  if (localStorageService.getOnboardingTourDataMode()) {
    return of(localStorageService.getOnboardingTourData<ApplicationBasicSettings>() ?? undefined);
  }

  const settingsService = inject(SettingsService);
  return settingsService.getApplicationSettings();
};
