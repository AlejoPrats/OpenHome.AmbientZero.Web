import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, of, switchMap, tap, timer } from 'rxjs';
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
  private _progressMessages = signal<string[] | undefined>(undefined);

  public progress = this._progress.asReadonly();
  public progressMessages = this._progressMessages.asReadonly();

  public pipeline = toSignal(
    toObservable(this.loadingService.longLoading).pipe(
      switchMap((isLongLoading) => {
        if (isLongLoading) {
          this.counterService.start();

          return timer(0, 20000).pipe(
            switchMap(() =>
              this.http.get<ProgressResult>('/api/system/GetTestJson').pipe(
                tap((responseFromServer) => {
                  this._progress.set(responseFromServer);
                  this._progressMessages.set(responseFromServer.message.split('||'));

                  if (responseFromServer.percentage === 100) {
                    this.counterService.stop();
                  }
                }),
                catchError((error) => {
                  console.error('Progress fetch failed:', error);
                  return of({ percentage: 0 } as ProgressResult);
                }),
              ),
            ),
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
