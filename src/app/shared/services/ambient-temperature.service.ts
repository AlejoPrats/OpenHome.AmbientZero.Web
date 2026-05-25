import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ChartResponse } from '../interfaces/chart-response';

@Injectable({
  providedIn: 'root',
})
export class AmbientTemperatureService {
  private readonly http = inject(HttpClient);
  private readonly sensorApiRoot = '/api/AmbientTemperature';

  getDailyTemperatures(): Observable<ChartResponse> {
    const params = new HttpParams().set('dateTime', '12/12/2025');
    const data = this.http.get<ChartResponse>(`${this.sensorApiRoot}`, { params });
    return data ?? [];
  }
}
