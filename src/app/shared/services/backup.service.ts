import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackupService {
  private readonly http = inject(HttpClient);
  private readonly bakcupApiRoot = '/api/Backup';

  uploadImportFile(file: File) {
    const form = new FormData();
    form.append('file', file);
    return this.http.post<void>(`${this.bakcupApiRoot}/UploadModuleFile`, form);
  }

  generateBackup(): Observable<void> {
    return this.http.get<void>(`${this.bakcupApiRoot}/GenerateBackup`);
  }

  downloadBackup(): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.bakcupApiRoot}/DownloadBackup`, {
      responseType: 'blob',
      observe: 'response',
    });
  }
}
