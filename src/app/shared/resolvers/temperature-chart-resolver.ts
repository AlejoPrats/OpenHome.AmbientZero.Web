import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ChartResponse } from '../interfaces/chart-response';
import { AmbientTemperatureService } from '../services/ambient-temperature.service';

export const temperatureChartResolver: ResolveFn<ChartResponse> = (_route, _state) => {
  const ambientTemperatureService = inject(AmbientTemperatureService);
  return ambientTemperatureService.getDailyTemperatures();
};
