import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeZone } from '../interfaces/time-zone';
import { ApplicationSettings } from '../classes/application-settings';
import { SensorUpdateRequest } from '../classes/sensor-update-request';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  url = 'http://192.168.50.138/Sensor/GetSensorData';

  constructor(private http: HttpClient) { }

  getTimeZones(): Observable<TimeZone[]> {
    const data = this.http.get<TimeZone[]>("http://192.168.50.138/System/GetTimeZones");
    return data ?? [];
  }

  saveApplicationSettings(applicationSettings: ApplicationSettings[]): Observable<any> {
    return this.http.put("http://192.168.50.138/ApplicationSettings/SaveApplicationSettings", applicationSettings);
  }

  getApplicationSettings(): Observable<ApplicationSettings[]> {
    return this.http.get<ApplicationSettings[]>("http://192.168.50.138/ApplicationSettings/GetApplicationSettings");
  }

  saveSensorSettings(sensorUpdateRequest: SensorUpdateRequest): Observable<any> {
    return this.http.patch<ApplicationSettings[]>("http://192.168.50.138/Sensor/UpdateSensorSettings", sensorUpdateRequest);
  }

}
