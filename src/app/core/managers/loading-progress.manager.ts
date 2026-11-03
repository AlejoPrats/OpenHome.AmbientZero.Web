import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, of, switchMap, takeWhile, tap, timer } from 'rxjs';
import { ProgressResult } from 'app/shared/interfaces/progress-result';
import { LoadingService } from '../services/loading.service';
import { CounterService } from '../services/counter.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingProgressManager {
  private http = inject(HttpClient);
  private loadingService = inject(LoadingService);
  private counterService = inject(CounterService);

  private _progress = signal<ProgressResult | undefined>(undefined);
  private _progressMessages = signal<string[][] | undefined>(undefined);

  public progress = this._progress.asReadonly();
  public progressMessages = this._progressMessages.asReadonly();

  public pipeline = toSignal(
    toObservable(this.loadingService.longLoading).pipe(
      switchMap((isLongLoading) => {
        if (isLongLoading) {
          this.counterService.start();

          return timer(7000, 10000).pipe(
            switchMap(() =>
              this.http.get<ProgressResult>(`/api/system/GetProgress?t=${Date.now()}`).pipe(
                tap((responseFromServer) => {
                  this._progress.set(responseFromServer);
                  this._progressMessages.set(responseFromServer.Message);

                  if (responseFromServer.Percentage === 100) {
                    this.counterService.stop();
                  }
                }),
                catchError((error) => {
                  console.error('Progress fetch failed:', error);
                  return of({ Percentage: 0 } as ProgressResult);
                }),
              ),
            ),
            takeWhile((responseFromServer) => responseFromServer.Percentage < 100, true),
          );
        }

        this.counterService.stop();
        this._progress.set(undefined);
        this._progressMessages.set(undefined);
        return EMPTY;
      }),
    ),
    { initialValue: null },
  );
}
