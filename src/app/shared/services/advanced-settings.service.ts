import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AdvancedSettingsResponse } from '../interfaces/advanced-settings-response';
import { Observable } from 'rxjs';
import { GeneralSettingsResponse } from '../interfaces/general-settings-response';

@Injectable({
  providedIn: 'root',
})
export class AdvancedSettingsService {
  private readonly http = inject(HttpClient);
  private readonly sensorApiRoot = '/api/AdvancedApplicationSettings';

  getAdvancedSettings(): Observable<AdvancedSettingsResponse> {
    const data = this.http.get<AdvancedSettingsResponse>(`${this.sensorApiRoot}/GetAdvancedSettings`);
    return data ?? [];
  }

  updateGeneralSettings(generalSettings: GeneralSettingsResponse): Observable<void> {
    return this.http.patch<void>(`${this.sensorApiRoot}/UpdateGeneralSettings`, generalSettings);
  }
}
