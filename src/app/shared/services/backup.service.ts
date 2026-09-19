import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackupService {
  private readonly http = inject(HttpClient);
  private readonly sensorApiRoot = '/api/Backup';
}
