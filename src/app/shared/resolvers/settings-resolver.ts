import { ResolveFn } from '@angular/router';
import { ApplicationSettings } from '../models/application-settings';
import { SettingsService } from '../services/settings.service';
import { inject } from '@angular/core';
import { LocalStorageService } from 'app/core/services/local-storage.service';

export const applicationSettingsResolver: ResolveFn<ApplicationSettings[]> = (_route, _state) => {
  const localStorageService = inject(LocalStorageService);

  if (localStorageService.getOnboardingTourDataMode()) {
    return localStorageService.getOnboardingTourData();
  }

  const settingsService = inject(SettingsService);
  return settingsService.getApplicationSettings();
};
