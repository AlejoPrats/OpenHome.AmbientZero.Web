import { inject, Injectable } from '@angular/core';
import { ProtectionMode } from '../../core/enums/protection-mode';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../interfaces/login-response';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly sensorApiRoot = '/api/Auth';

  isLoggedIn(): boolean {
    const token = this.localStorageService.getAuthenticationToken();

    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000;

    return Date.now() < expiry;
  }

  getProtectionMode(): Observable<ProtectionMode> {
    const data = this.http.get<ProtectionMode>(`${this.sensorApiRoot}/GetProtectionMode`);
    return data;
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse | null> {
    const data = this.http.post<LoginResponse>(`${this.sensorApiRoot}/login`, loginRequest);
    return data ?? null;
  }

}
