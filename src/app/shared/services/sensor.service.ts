import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SensorInformationResponse } from '../interfaces/sensor-information-response';
import { ApplicationSettings } from '../models/application-settings';
import { SensorUpdateRequest } from '../models/sensor-update-request';

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

  saveSensorSettings(sensorUpdateRequest: SensorUpdateRequest): Observable<ApplicationSettings[]> {
    return this.http.patch<ApplicationSettings[]>(`${this.sensorApiRoot}/UpdateSensorSettings`, sensorUpdateRequest);
  }

  deleteSensor(sensorId: number): Observable<void> {
    const params = new HttpParams().set('sensorId', sensorId);
    return this.http.delete<void>(`${this.sensorApiRoot}/DeleteSensor`, { params });
  }
}
