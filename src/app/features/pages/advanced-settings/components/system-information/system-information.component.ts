import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { provideTranslocoScope, TranslocoModule } from '@jsverse/transloco';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiButton, TuiExpand, TuiIcon, TuiTitle, TuiHintDirective } from '@taiga-ui/core';
import { TuiChevron } from '@taiga-ui/kit';
import { TuiCard, TuiHeader } from '@taiga-ui/layout';
import { NotificationService } from 'app/core/services/notification-service.service';
import { DeviceStatusResult } from 'app/shared/interfaces/device-status-result';
import { SystemService } from 'app/shared/services/system.service';

interface StatusIndicator {
  className: string;
  label: string;
}

const parseMebibytes = (value: string | undefined): number | null => {
  const mebibytes = Number(value?.replace(' MiB', ''));
  return value === undefined || Number.isNaN(mebibytes) ? null : mebibytes;
};

@Component({
  selector: 'app-system-information',
  imports: [
    TranslocoModule,
    TuiButton,
    TuiCard,
    TuiChevron,
    TuiExpand,
    TuiHeader,
    TuiIcon,
    TuiTable,
    TuiTitle,
    TuiHintDirective,
  ],
  providers: [
    provideTranslocoScope({ scope: 'pages/system-information', alias: 'system-information' }),
  ],
  templateUrl: './system-information.component.html',
  styleUrl: './system-information.component.less',
})
export class SystemInformationComponent {
  protected data = input.required<DeviceStatusResult | null>();
  protected readonly systemStatus = linkedSignal(() => this.data());
  private readonly systemService = inject(SystemService);
  private readonly notificationService = inject(NotificationService);
  public readonly ramCollapsed = signal(true);
  public readonly swapCollapsed = signal(true);
  public readonly cpuCollapsed = signal(true);

  protected readonly ramStatus = computed<StatusIndicator | null>(() => {
    const freeRam = parseMebibytes(this.systemStatus()?.memory?.free);
    if (freeRam === null) {
      return null;
    }
    if (freeRam >= 70) {
      return { className: 'status-good', label: 'Nominal' };
    }
    if (freeRam > 30) {
      return { className: 'status-warning', label: 'Low but safe' };
    }
    return { className: 'status-risk', label: 'Very low and at risk' };
  });

  protected readonly swapStatus = computed<StatusIndicator | null>(() => {
    const usedSwap = parseMebibytes(this.systemStatus()?.swap?.used);
    if (usedSwap === null) {
      return null;
    }
    if (usedSwap === 0) {
      return { className: 'status-good', label: 'Nominal' };
    }
    if (usedSwap <= 30) {
      return { className: 'status-warning', label: 'Some swap used but safe' };
    }
    return { className: 'status-risk', label: 'Warning! this can bottleneck your cpu' };
  });

  protected readonly cpuStatus = computed<StatusIndicator | null>(() => {
    const cpuTemperature = this.systemStatus()?.cpu?.temperature;
    if (cpuTemperature === undefined || cpuTemperature === null) {
      return null;
    }
    if (cpuTemperature < 50) {
      return { className: 'status-good', label: 'Nominal' };
    }
    if (cpuTemperature < 65) {
      return { className: 'status-warning', label: 'Warm but Safe' };
    }
    return { className: 'status-risk', label: 'Warning! Overheating' };
  });

  private getSystemInformation() {
    this.systemService.getSystemInformation().subscribe({
      next: (result) => {
        this.systemStatus.set(result);
      },
      error: () => {
        this.notificationService
          .Message('There was a problem retrieving the system information', 'Error')
          .ErrorType()
          .BottomRight()
          .Show();
      },
    });
  }

  protected cleanCache() {
    this.systemService.clearCache().subscribe({
      next: () => {
        this.notificationService
          .Message('Cache cleared successfuly', 'Success')
          .SuccessType()
          .BottomRight()
          .Show();
        this.getSystemInformation();
      },
      error: () => {
        this.notificationService
          .Message('There was a problem clearing the cache', 'Error')
          .ErrorType()
          .BottomRight()
          .Show();
      },
    });
  }
}
