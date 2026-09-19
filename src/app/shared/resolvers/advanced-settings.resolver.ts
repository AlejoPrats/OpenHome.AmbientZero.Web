import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AdvancedSettingsService } from '../services/advanced-settings.service';
import { AdvancedSettingsResponse } from '../interfaces/advanced-settings-response';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { of } from 'rxjs';

export const advancedSettingsResolver: ResolveFn<AdvancedSettingsResponse> = () => {
  const localStorageService = inject(LocalStorageService);

  if (localStorageService.getOnboardingTourDataMode()) {
    return of(localStorageService.getOnboardingTourData<AdvancedSettingsResponse>()!);
  }

  const advancedSettingsService = inject(AdvancedSettingsService);
  return advancedSettingsService.getAdvancedSettings();
};
