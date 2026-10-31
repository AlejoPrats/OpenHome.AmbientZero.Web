import { ResolveFn } from '@angular/router';
import { TimeZone } from '../interfaces/time-zone';
import { SystemService } from '../services/system.service';
import { inject } from '@angular/core';
import { DeviceStatusResult } from '../interfaces/device-status-result';
import { catchError, of } from 'rxjs';

export const systemTimeZonesResolver: ResolveFn<TimeZone[]> = (_route, _state) => {
  const systemService = inject(SystemService);
  return systemService.getTimeZones();
};

export const systemStatusResolver: ResolveFn<DeviceStatusResult | null> = (_route, _state) => {
  const systemService = inject(SystemService);
  return systemService.getSystemInformation().pipe(catchError(() => of(null)));
};
