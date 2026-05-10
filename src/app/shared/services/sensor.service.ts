import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SensorInformationResponse } from '../interfaces/sensor-information-response';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  private readonly http = inject(HttpClient);
  private readonly sensorApiRoot = 'https://localhost:7127/Sensor/GetSensorData';

  getAllSensors(): Observable<SensorInformationResponse[]> {
    const data = this.http.get<SensorInformationResponse[]>(this.sensorApiRoot);
    return data ?? [];
  }
}
