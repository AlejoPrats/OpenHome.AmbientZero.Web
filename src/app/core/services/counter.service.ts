import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  private _count = signal<number>(0);
  private timerId: number | null = null;

  public count = this._count.asReadonly();

  public start(): void {
    if (this.timerId !== null) return;

    this.timerId = setInterval(() => {
      this._count.update((current) => current + 1);
    }, 1000);
  }

  public stop(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  // Resets the counter back to zero
  public reset(): void {
    this.stop();
    this._count.set(0);
  }
}
