import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SensorInformationResponse } from '../interfaces/sensor-information-response';
import { SensorDailyTemperatureResponse } from '../interfaces/sensor-daily-temperature-response';
import { ChartResponse } from '../interfaces/chart-response';
import { ApplicationSettings } from '../models/application-settings';
import { SensorUpdateRequest } from '../models/sensor-update-request';
import { NameUpdateRequest } from '../models/name-update-request';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  private readonly http = inject(HttpClient);
  private readonly sensorApiRoot = '/api/Sensor';

  getAllSensors(): Observable<SensorInformationResponse[]> {
    const data = this.http.get<SensorInformationResponse[]>(`${this.sensorApiRoot}/GetSensorData`);
    return data ?? [];
  }

  getSensorById(sensorId: number): Observable<SensorInformationResponse> {
    const params = new HttpParams().set('sensorId', sensorId);
    const data = this.http.get<SensorInformationResponse>(`${this.sensorApiRoot}/GetSensorById`, { params });
    return data;
  }

  saveSensorSettings(sensorUpdateRequest: SensorUpdateRequest): Observable<any> {
    return this.http.patch<ApplicationSettings[]>(`${this.sensorApiRoot}/UpdateSensorSettings`, sensorUpdateRequest);
  }

  deleteSensor(sensorId: number): Observable<any> {
    const params = new HttpParams().set('sensorId', sensorId);
    return this.http.delete(`${this.sensorApiRoot}/DeleteSensor`, { params });
  }

  updateSensorName(nameUpdateRequest: NameUpdateRequest): Observable<any> {
    return this.http.patch(`${this.sensorApiRoot}/UpdateSensorName`, nameUpdateRequest);
  }
}
