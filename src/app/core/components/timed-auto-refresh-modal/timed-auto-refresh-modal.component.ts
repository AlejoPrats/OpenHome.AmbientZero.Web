import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { TimerService } from 'app/core/services/timer.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-timed-auto-refresh-modal',
  imports: [DecimalPipe],
  templateUrl: './timed-auto-refresh-modal.component.html',
  styleUrl: './timed-auto-refresh-modal.component.less',
})
export class TimedAutoRefreshModalComponent implements OnInit {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly timerService = inject(TimerService);

  ngOnInit() {
    interval(1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.cdr.markForCheck());
    this.timerService.setTimer('reboot', 20_000);
    this.timerService
      .finished('reboot')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => location.replace(window.location.href));
  }
}
