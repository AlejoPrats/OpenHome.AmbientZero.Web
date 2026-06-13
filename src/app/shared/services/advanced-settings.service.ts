import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AdvancedSettingsResponse } from '../interfaces/advanced-settings-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdvancedSettingsService {
    private readonly http = inject(HttpClient);
  private readonly sensorApiRoot = '/api/AdvancedApplicationSettings';

  getAdvancedSettings(): Observable<AdvancedSettingsResponse> {
    const data = this.http.get<AdvancedSettingsResponse>(`${this.sensorApiRoot}`);
    return data ?? [];
  }
}
