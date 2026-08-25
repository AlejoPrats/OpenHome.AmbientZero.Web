import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeZone } from '../interfaces/time-zone';

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
}
