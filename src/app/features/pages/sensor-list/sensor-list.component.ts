import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { interval, map, Subscription } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { SensorInformationResponse } from '../../../shared/interfaces/sensor-information-response';
import { DatePipe, DecimalPipe } from '@angular/common';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { IconName } from '../../../shared/components/icon/icon-name.enum';
import { TuiResponsiveDialogService } from '@taiga-ui/addon-mobile';
import { TUI_CONFIRM, TuiConfirmData } from '@taiga-ui/kit';
import { SensorService } from '../../../shared/services/sensor.service';
import { BreadcrumbService } from '../../../core/services/breadcrumb.service';
import { AdditionalPageInformationService } from '../../../core/services/additional-page-information.service';

@Component({
  selector: 'app-sensor-list',
  imports: [DatePipe, DecimalPipe, IconComponent, RouterLink, RouterModule],
  templateUrl: './sensor-list.component.html',
  styleUrl: './sensor-list.component.less',
})
export class SensorListComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly dialogs = inject(TuiResponsiveDialogService);
  protected readonly additionalPageInformationService = inject(AdditionalPageInformationService);
  private readonly sensorService = inject(SensorService);
  private readonly breadcrumbService = inject(BreadcrumbService);
  private autoRefreshSub!: Subscription;
  protected readonly IconName = IconName;
  protected readonly sensorList = signal<SensorInformationResponse[] | null>(null);
  protected readonly resolvedSensors = toSignal(
    this.route.data.pipe(map(({ sensors }) => sensors as SensorInformationResponse[])),
    { initialValue: null },
  );

  ngOnInit() {
    this.breadcrumbService.clearBreadcrumbs();
    this.breadcrumbService.addBreadcrumb("Sensors");
    this.additionalPageInformationService.setAdditionalInformation(`Last Updated: ${this.getTimeAsString()}`);
    this.sensorList.set(this.resolvedSensors());
    this.autoRefreshSub = interval(20 * 60 * 1000).subscribe(() => {
      this.refreshData();
    });
  }

  openDeleteDialog(id: number): void {
    const data: TuiConfirmData = {
      content: 'Are you sure you want to delete this sensor?',
      yes: 'Yes',
      no: 'No',
    };

    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Delete',
        size: 's',
        data,
      })
      .subscribe({
        next: () => {
          this.deleteDevice(id);
        },
      });
  }

  deleteDevice(id: number) {
    this.sensorService.deleteSensor(id).subscribe({
      next: () => {
        const index = this.sensorList()?.findIndex((x) => x.id == id);
        this.sensorList()?.splice(index!, 1);
      },
    });
  }

  private getTimeAsString(): string {
    const now = new Date(Date.now());

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  refreshData() {
    this.sensorService.getAllSensors().subscribe({
      next: (result) => {
        this.additionalPageInformationService.setAdditionalInformation(`Last Updated: ${this.getTimeAsString()}`);
        this.sensorList.set(result);
      }
    })
  }

  ngOnDestroy() {
    this.autoRefreshSub?.unsubscribe();
  }
}
