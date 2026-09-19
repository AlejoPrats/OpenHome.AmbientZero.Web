import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  readonly loading = signal(false);

  loadingOn() {
    this.loading.set(true);
  }

  loadingOff() {
    this.loading.set(false);
  }
}
