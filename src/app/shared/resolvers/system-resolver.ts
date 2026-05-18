import { ResolveFn } from '@angular/router';
import { TimeZone } from '../interfaces/time-zone';
import { SystemService } from '../services/system.service';
import { inject } from '@angular/core';

export const systemTimeZonesResolver: ResolveFn<TimeZone[]> = (route, state) => {
  const systemService = inject(SystemService);
  return systemService.getTimeZones();
};
