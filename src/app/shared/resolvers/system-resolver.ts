import { ResolveFn } from '@angular/router';
import { TimeZone } from '../interfaces/time-zone';
import { SystemService } from '../services/system.service';
import { inject } from '@angular/core';
import { DeviceStatusResult } from '../interfaces/device-status-result';

export const systemTimeZonesResolver: ResolveFn<TimeZone[]> = (_route, _state) => {
  const systemService = inject(SystemService);
  return systemService.getTimeZones();
};

export const systemStatusResolver: ResolveFn<DeviceStatusResult> = (_route, _state) => {
  const systemService = inject(SystemService);
  return systemService.getSystemInformation();
};
