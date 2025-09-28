import { Injectable } from '@angular/core';
import { MeasurementLog } from '../interfaces/measurement-log';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  url = 'http://192.168.50.138/AmbientTemperature?dateTime=';
  
    protected sensorsList: MeasurementLog[] = [];

    constructor(private http: HttpClient) { }
  
    getDailyMeasurements(date:Date|undefined = undefined) : Observable<MeasurementLog[]> 
    {
      if(date === undefined)
      {
        date = new Date(Date.now());
      }

      var day = date.getDate();
      var month = date.getMonth()+1;
      var year = date.getFullYear();

      
      const data = this.http.get<MeasurementLog[]>(this.url+month+'/'+day+'/'+year);
      return data ?? [];
    }
}
