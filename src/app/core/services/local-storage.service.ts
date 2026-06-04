import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../constants/storage-keys.constants';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  getAuthenticationToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.TOKEN_STORAGE);
  }

  setAuthenticationToken(token: string) {
    localStorage.setItem(STORAGE_KEYS.TOKEN_STORAGE, token);
  }

  setTimer(timerName: string, timerSpan: number) {
    localStorage.setItem(STORAGE_KEYS.TIMER_PREFIX + timerName, timerSpan.toString());
  }

  getTimer(timerName: string): number | null {
    const raw = localStorage.getItem(STORAGE_KEYS.TIMER_PREFIX + timerName);
    return raw ? Number(raw) : null;
  }

  removeTimer(timerName: string) {
    localStorage.removeItem(STORAGE_KEYS.TIMER_PREFIX + timerName);
  }

  getLoginAttempts(): number {
    const raw = localStorage.getItem(STORAGE_KEYS.LOGIN_ATTEMPTS);
    return raw ? Number(raw) : 0;
  }

  setLoginAttempts(count: number): void {
    localStorage.setItem(STORAGE_KEYS.LOGIN_ATTEMPTS, count.toString());
  }

  clearLoginAttempts(): void {
    localStorage.removeItem(STORAGE_KEYS.LOGIN_ATTEMPTS);
  }
}
