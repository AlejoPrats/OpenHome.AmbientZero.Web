import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ChartResponse } from '../interfaces/chart-response';
import { TuiDay } from '@taiga-ui/cdk';

@Injectable({
  providedIn: 'root',
})
export class AmbientTemperatureService {
  private readonly http = inject(HttpClient);
  private readonly sensorApiRoot = '/api/AmbientTemperature';

  getDailyTemperatures(date: TuiDay = TuiDay.currentLocal()): Observable<ChartResponse> {
    const params = new HttpParams().set('dateTime', date.toLocalNativeDate().toLocaleDateString('en-EN'));
    const data = this.http.get<ChartResponse>(`${this.sensorApiRoot}`, { params });
    return data ?? [];
  }
}
