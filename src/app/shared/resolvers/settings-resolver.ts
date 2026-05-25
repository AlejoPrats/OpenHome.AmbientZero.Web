import { ResolveFn } from '@angular/router';
import { ApplicationSettings } from '../models/application-settings';
import { SettingsService } from '../services/settings.service';
import { inject } from '@angular/core';

export const applicationSettingsResolver: ResolveFn<ApplicationSettings[]> = (_route, _state) => {
  const settingsService = inject(SettingsService);
  return settingsService.getApplicationSettings();
};
