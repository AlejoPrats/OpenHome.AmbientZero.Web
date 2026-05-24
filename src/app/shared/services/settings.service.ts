import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationSettings } from '../models/application-settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly http = inject(HttpClient);
  private readonly applicationSettingsApiRoot = '/api/ApplicationSettings';

  saveApplicationSettings(applicationSettings: ApplicationSettings[]): Observable<any> {
    return this.http.put(
      `${this.applicationSettingsApiRoot}/SaveApplicationSettings`,
      applicationSettings,
    );
  }

  getApplicationSettings(): Observable<ApplicationSettings[]> {
    return this.http.get<ApplicationSettings[]>(
      `${this.applicationSettingsApiRoot}/GetApplicationSettings`,
    );
  }
}
