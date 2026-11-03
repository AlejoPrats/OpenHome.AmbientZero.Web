import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
  protected readonly timerService = inject(TimerService);

  ngOnInit() {
    setInterval(() => this.cdr.markForCheck(), 1000);
    this.timerService.setTimer('reboot', 20_000);
    this.timerService.onFinish('reboot', () => {
      location.replace(window.location.href);
    });
  }
}
