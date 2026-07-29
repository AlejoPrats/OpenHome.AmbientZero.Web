import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OnboardingSetupService {
  private readonly http = inject(HttpClient);
  private readonly sensorApiRoot = '/api/Onboarding';

  setLanguage(language: string): Observable<void> {
    const params = new HttpParams().set('language', language);
    const data = this.http.post<void>(`${this.sensorApiRoot}/SetLanguage`, null, { params });
    return data;
  }

  setTimezone(timezoneId: string): Observable<void> {
    const params = new HttpParams().set('timezone', timezoneId);
    const data = this.http.post<void>(`${this.sensorApiRoot}/SetTimeZone`, null, { params });
    return data;
  }

  setTemperatureUnit(unitId: string): Observable<void> {
    const params = new HttpParams().set('unitId', unitId);
    const data = this.http.post<void>(`${this.sensorApiRoot}/SetUnit`, null, { params });
    return data;
  }

  setAdminPassword(password: string): Observable<void> {
    const params = new HttpParams().set('password', password);
    const data = this.http.post<void>(`${this.sensorApiRoot}/SetAdminPassword`, null, { params });
    return data;
  }
}
