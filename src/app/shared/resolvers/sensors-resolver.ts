import { ResolveFn } from '@angular/router';
import { SensorService } from '../services/sensor.service';
import { inject } from '@angular/core';
import { SensorInformationResponse } from '../interfaces/sensor-information-response';

export const sensorsResolver: ResolveFn<SensorInformationResponse[]> = (_route, _state) => {
  const sensorService = inject(SensorService);
  return sensorService.getAllSensors();
};
