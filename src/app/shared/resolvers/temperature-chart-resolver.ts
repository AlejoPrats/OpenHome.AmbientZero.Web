import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ChartResponse } from '../interfaces/chart-response';
import { AmbientTemperatureService } from '../services/ambient-temperature.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { of } from 'rxjs';

export const temperatureChartResolver: ResolveFn<ChartResponse> = (_route, _state) => {
  const localStorageService = inject(LocalStorageService);

  if (localStorageService.getOnboardingTourDataMode()) {
    return of(localStorageService.getOnboardingTourData<ChartResponse>()!);
  }

  const ambientTemperatureService = inject(AmbientTemperatureService);
  return ambientTemperatureService.getDailyTemperatures();
};
