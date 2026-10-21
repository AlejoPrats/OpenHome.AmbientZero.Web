import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  readonly loading = signal(false);
  readonly longLoading = signal(false);
  readonly isBackground = signal(false);

  loadingOn() {
    this.loading.set(true);
  }

  loadingOff() {
    this.loading.set(false);
  }

  longLoadingOn() {
    this.longLoading.set(true);
  }

  longLoadingOff() {
    this.longLoading.set(false);
  }

  isBackgroundOn() {
    this.isBackground.set(true);
  }

  isBackgroundOff() {
    this.isBackground.set(false);
  }
}
