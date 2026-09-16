import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationBasicSettings } from '../interfaces/application-basic-settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly http = inject(HttpClient);
  private readonly applicationSettingsApiRoot = '/api/ApplicationSettings';

  saveApplicationSettings(applicationSettings: ApplicationBasicSettings): Observable<void> {
    return this.http.put<void>(
      `${this.applicationSettingsApiRoot}/SaveApplicationSettings`,
      applicationSettings,
    );
  }

  getApplicationSettings(): Observable<ApplicationBasicSettings> {
    return this.http.get<ApplicationBasicSettings>(
      `${this.applicationSettingsApiRoot}/GetApplicationSettings`,
    );
  }
}
