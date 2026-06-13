import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AdvancedSettingsService } from '../services/advanced-settings.service';
import { AdvancedSettingsResponse } from '../interfaces/advanced-settings-response';

export const advancedSettingsResolver: ResolveFn<AdvancedSettingsResponse> = (route, state) => {
  const advancedSettingsService = inject(AdvancedSettingsService);
  return advancedSettingsService.getAdvancedSettings();
};
