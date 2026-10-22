import { Component, inject, input, OnInit, signal } from '@angular/core';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiButton, TuiExpand, TuiIcon, TuiTitle, TuiHintDirective } from '@taiga-ui/core';
import { TuiChevron } from '@taiga-ui/kit';
import { TuiCard, TuiHeader } from '@taiga-ui/layout';
import { NotificationService } from 'app/core/services/notification-service.service';
import { DeviceStatusResult } from 'app/shared/interfaces/device-status-result';
import { SystemService } from 'app/shared/services/system.service';

@Component({
  selector: 'app-system-information',
  imports: [
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
  templateUrl: './system-information.component.html',
  styleUrl: './system-information.component.less',
})
export class SystemInformationComponent implements OnInit {
  protected data = input.required<DeviceStatusResult>();
  protected systemStatus = signal<DeviceStatusResult | null>(null);
  private readonly systemService = inject(SystemService);
  private readonly notificationService = inject(NotificationService);
  public readonly ramCollapsed = signal(true);
  protected ramStatusClass: string = '';
  protected ramStatusLabel: string = '';

  public readonly swapCollapsed = signal(true);
  protected swapStatusClass: string = '';
  protected swapStatusLabel: string = '';

  public readonly cpuCollapsed = signal(true);
  protected cpuStatusClass: string = '';
  protected cpuStatusLabel: string = '';

  ngOnInit() {
    this.systemStatus.set(this.data());
    this.calculateRamStatus();
    this.calculateSwapStatus();
    this.calculateCpuStatus();
  }

  constructor() {}

  private getSystemInformation() {
    this.systemService.getSystemInformation().subscribe({
      next: (result) => {
        this.systemStatus.set(result);
        this.calculateRamStatus();
        this.calculateSwapStatus();
        this.calculateCpuStatus();
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

  private calculateRamStatus() {
    const freeRam = Number(this.systemStatus()?.memory.free.replace(' MiB', ''));
    if (freeRam >= 70) {
      this.ramStatusClass = 'status-good';
      this.ramStatusLabel = 'Nominal';
    } else if (freeRam < 70 && freeRam > 30) {
      this.ramStatusClass = 'status-warning';
      this.ramStatusLabel = 'Low but safe';
    } else {
      this.ramStatusClass = 'status-risk';
      this.ramStatusLabel = 'Very low and at risk';
    }
  }

  private calculateSwapStatus() {
    const usedSwap = Number(this.systemStatus()?.swap.used.replace(' MiB', ''));
    if (usedSwap === 0) {
      this.swapStatusClass = 'status-good';
      this.swapStatusLabel = 'Nominal';
    } else if (usedSwap <= 30) {
      this.swapStatusClass = 'status-warning';
      this.swapStatusLabel = 'Some swap used but safe';
    } else {
      this.swapStatusClass = 'status-risk';
      this.swapStatusLabel = 'Warning! this can bottleneck your cpu';
    }
  }

  private calculateCpuStatus() {
    const cpuTemperature = this.systemStatus()!.cpu.temperature!;
    if (cpuTemperature < 50) {
      this.cpuStatusClass = 'status-good';
      this.cpuStatusLabel = 'Nominal';
    } else if (cpuTemperature >= 50 && cpuTemperature < 65) {
      this.cpuStatusClass = 'status-warning';
      this.cpuStatusLabel = 'Warm but Safe';
    } else {
      this.cpuStatusClass = 'status-risk';
      this.cpuStatusLabel = 'Warning! Overheating';
    }
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
