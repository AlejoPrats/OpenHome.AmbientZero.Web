import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VersionResponse } from '../interfaces/version-response';

@Injectable({
  providedIn: 'root',
})
export class VersionService {
  private readonly http = inject(HttpClient);
  private readonly systemApiRoot = '/api/Versioning';

  getVersions(): Observable<VersionResponse[]> {
    const data = this.http.get<VersionResponse[]>(`${this.systemApiRoot}/GetVersions`);
    return data ?? [];
  }

  updateVersions():Observable<VersionResponse[]>{
    const data = this.http.get<VersionResponse[]>(`${this.systemApiRoot}/UpdateVersion`);
    return data ?? [];
  }
}
