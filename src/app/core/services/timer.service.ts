import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { filter, interval, map, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TimerService {
  private localStorageService = inject(LocalStorageService);

  setTimer(name: string, durationMs: number): void {
    const until = Date.now() + durationMs;
    this.localStorageService.setTimer(name, until);
  }

  clearTimer(name: string): void {
    this.localStorageService.removeTimer(name);
  }

  getRemaining(name: string): number {
    const until = this.localStorageService.getTimer(name);
    if (!until) return 0;

    return Math.max(0, until - Date.now());
  }

  isActive(name: string): boolean {
    return this.getRemaining(name) > 0;
  }

  onFinish(name: string, callback: () => void): void {
    interval(250)
      .pipe(
        map(() => this.getRemaining(name)),
        filter((remaining) => remaining <= 0),
        take(1),
      )
      .subscribe(() => callback());
  }
}
