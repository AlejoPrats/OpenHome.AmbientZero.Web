import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeZone } from '../interfaces/time-zone';
import { DeviceStatusResult } from '../interfaces/device-status-result';

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  private readonly http = inject(HttpClient);
  private readonly systemApiRoot = '/api/System';

  getTimeZones(): Observable<TimeZone[]> {
    const data = this.http.get<TimeZone[]>(`${this.systemApiRoot}/GetTimeZones`);
    return data ?? [];
  }

  getSystemInformation(): Observable<DeviceStatusResult> {
    const data = this.http.get<DeviceStatusResult>(`${this.systemApiRoot}/GetSystemInformation`);
    return data;
  }

  clearCache(): Observable<void> {
    const params = new HttpParams().set('freeRamMode', 0);
    const data = this.http.get<void>(`${this.systemApiRoot}/RamCleanup`, { params });
    return data;
  }

  cleanAllRam(): Observable<number> {
    const params = new HttpParams().set('freeRamMode', 1);
    const data = this.http.get<number>(`${this.systemApiRoot}/RamCleanup`, { params });
    return data;
  }
}
