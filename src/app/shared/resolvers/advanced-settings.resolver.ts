import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AdvancedSettingsService } from '../services/advanced-settings.service';
import { AdvancedSettingsResponse } from '../interfaces/advanced-settings-response';
import { LocalStorageService } from 'app/core/services/local-storage.service';

export const advancedSettingsResolver: ResolveFn<AdvancedSettingsResponse> = (route, state) => {
  const localStorageService = inject(LocalStorageService);

  if (localStorageService.getOnboardingTourDataMode()) {
    return localStorageService.getOnboardingTourData();
  }

  const advancedSettingsService = inject(AdvancedSettingsService);
  return advancedSettingsService.getAdvancedSettings();
};
