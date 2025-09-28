import { Injectable } from '@angular/core';
import { SensorInformation } from '../interfaces/sensor-information';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NameUpdateRequest } from '../classes/name-update-request';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {
  url = 'http://192.168.50.138/Sensor/GetSensorData';

  protected sensorsList: SensorInformation[] = [{"id":2,"deviceId":"26453293-33e9-4347-90cd-d48c4927ae9c","deviceVirtualName":"Living","adcReading":73,"isSignaling":false,"lastReadingTime":"2025-01-06T09:53:36.8548419","lastReadingValue":22.56756,"temperatureTendency":"Rising","sensorSetting":{"deviceId":"26453293-33e9-4347-90cd-d48c4927ae9c","isLightEnabled":true,"isScheduled":false,"disableStartTime":"20:12:00","disableEndTime":"12:12:00"}},{"id":3,"deviceId":"b67d6362-eeec-438b-af37-19026a0859c4","deviceVirtualName":"Habitacion Huespedes","adcReading":95,"isSignaling":false,"lastReadingTime":"2025-01-06T10:07:13.2117277","lastReadingValue":20.99037,"temperatureTendency":"Rising","sensorSetting":{"deviceId":"b67d6362-eeec-438b-af37-19026a0859c4","isLightEnabled":false,"isScheduled":false,"disableStartTime":null,"disableEndTime":null}},{"id":4,"deviceId":"<<Add GUID here>>","deviceVirtualName":null,"adcReading":-70,"isSignaling":false,"lastReadingTime":"2024-04-02T18:01:43.6512885","lastReadingValue":25.43964,"temperatureTendency":"Rising","sensorSetting":{"deviceId":"<<Add GUID here>>","isLightEnabled":true,"isScheduled":false,"disableStartTime":null,"disableEndTime":null}},{"id":5,"deviceId":"0b7f80b4-9482-48e7-aab5-98a8bfbf7ceb","deviceVirtualName":"Escritorio","adcReading":46,"isSignaling":false,"lastReadingTime":"2025-01-06T09:57:12.2049522","lastReadingValue":21.90266,"temperatureTendency":"Rising","sensorSetting":{"deviceId":"0b7f80b4-9482-48e7-aab5-98a8bfbf7ceb","isLightEnabled":true,"isScheduled":false,"disableStartTime":null,"disableEndTime":null}},{"id":6,"deviceId":"682eedc1-2357-458f-9341-6e64a9121418","deviceVirtualName":"Cocina","adcReading":47,"isSignaling":false,"lastReadingTime":"2025-01-06T09:56:49.3837862","lastReadingValue":21.62113,"temperatureTendency":"Rising","sensorSetting":{"deviceId":"682eedc1-2357-458f-9341-6e64a9121418","isLightEnabled":true,"isScheduled":false,"disableStartTime":null,"disableEndTime":null}},{"id":7,"deviceId":"f83bf262-63e7-469e-9131-a0998e33a5c8","deviceVirtualName":"Habitacion","adcReading":71,"isSignaling":false,"lastReadingTime":"2025-01-06T10:03:36.8935846","lastReadingValue":21.2429,"temperatureTendency":"Rising","sensorSetting":{"deviceId":"f83bf262-63e7-469e-9131-a0998e33a5c8","isLightEnabled":true,"isScheduled":true,"disableStartTime":"22:00:00","disableEndTime":"08:00:00"}}];

  constructor(private http: HttpClient) { }

  getAllSensors() : Observable<SensorInformation[]> 
  {
    const data = this.http.get<SensorInformation[]>(this.url);
    return data ?? [];
  }

  getSensorById(id: number) : Observable<SensorInformation>
  {
    const data = this.http.get<SensorInformation>('http://192.168.50.138/Sensor/GetSensorById?id='+id);
    return data;
  }

  updateSensorName(nameUpdateRequest: NameUpdateRequest) : Observable<any>
  {
    return this.http.patch('http://192.168.50.138/Sensor/UpdateSensorName',nameUpdateRequest);
  }
}
