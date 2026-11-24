import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { firstValueFrom, Observable, of, throwError } from 'rxjs';
import { Mock, vi } from 'vitest';

import { systemStatusResolver, systemTimeZonesResolver } from './system-resolver';
import { TimeZone } from '../interfaces/time-zone';
import { DeviceStatusResult } from '../interfaces/device-status-result';
import { SystemService } from '../services/system.service';

describe('systemTimeZonesResolver', () => {
  const executeResolver: ResolveFn<TimeZone[]> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => systemTimeZonesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

describe('systemStatusResolver', () => {
  let getSystemInformation: Mock<() => Observable<DeviceStatusResult>>;
  let systemStatus: DeviceStatusResult;

  const executeResolver = () =>
    TestBed.runInInjectionContext(() =>
      systemStatusResolver({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
    ) as Observable<DeviceStatusResult | null>;

  beforeEach(() => {
    systemStatus = {
      memory: { available: '512 MiB', free: '100 MiB' },
      swap: { used: '0 MiB' },
      cpu: { temperature: 45 },
    };
    getSystemInformation = vi.fn(() => of(systemStatus));

    TestBed.configureTestingModule({
      providers: [{ provide: SystemService, useValue: { getSystemInformation } }],
    });
  });

  it('should resolve the system information', async () => {
    await expect(firstValueFrom(executeResolver())).resolves.toEqual(systemStatus);
  });

  it('should resolve to null when the system information cannot be retrieved', async () => {
    getSystemInformation.mockReturnValue(throwError(() => new Error('Request failed')));

    await expect(firstValueFrom(executeResolver())).resolves.toBeNull();
  });
});
