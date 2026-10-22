import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VersionResponse } from '../interfaces/version-response';
import { ModuleUpdateRequest } from '../models/module-update-request';

@Injectable({
  providedIn: 'root',
})
export class VersionService {
  private readonly http = inject(HttpClient);
  private readonly versionApiRoot = '/api/Versioning';

  getVersions(): Observable<VersionResponse[]> {
    const data = this.http.get<VersionResponse[]>(`${this.versionApiRoot}/GetVersions`);
    return data ?? [];
  }

  updateVersions(): Observable<VersionResponse[]> {
    const data = this.http.get<VersionResponse[]>(`${this.versionApiRoot}/UpdateVersion`);
    return data ?? [];
  }

  updateModule(moduleUpdateRequest: ModuleUpdateRequest): Observable<void> {
    return this.http.post<void>(`${this.versionApiRoot}/UpdateModule`, moduleUpdateRequest);
  }

  uploadFile(file: File, moduleId: string): Observable<void> {
    const form = new FormData();
    form.append('file', file);
    form.append('moduleId', moduleId);
    return this.http.post<void>(`${this.versionApiRoot}/UploadModuleFile`, form);
  }
}
