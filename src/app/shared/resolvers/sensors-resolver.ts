import { ResolveFn } from '@angular/router';
import { SensorService } from '../services/sensor.service';
import { inject } from '@angular/core';
import { SensorInformationResponse } from '../interfaces/sensor-information-response';
import { number } from 'echarts';

export const sensorsResolver: ResolveFn<SensorInformationResponse[]> = (_route, _state) => {
  const sensorService = inject(SensorService);
  return sensorService.getAllSensors();
};

export const sensorInfrmationResolver: ResolveFn<SensorInformationResponse> = (route) => {
  const sensorService = inject(SensorService);
  const id = parseInt(route.paramMap.get('id')!);
  return sensorService.getSensorById(id);
};
