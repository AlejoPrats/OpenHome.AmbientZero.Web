import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
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
import { TuiButton, TuiDataList, TuiDropdown } from '@taiga-ui/core';
import { LocalStorageService } from 'app/core/services/local-storage.service';

@Component({
  selector: 'app-sensor-list',
  imports: [
    DatePipe,
    DecimalPipe,
    IconComponent,
    RouterLink,
    RouterModule,
    TuiButton,
    TuiDataList,
    TuiDropdown,
  ],
  templateUrl: './sensor-list.component.html',
  styleUrl: './sensor-list.component.less',
})
export class SensorListComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly dialogs = inject(TuiResponsiveDialogService);
  protected readonly additionalPageInformationService = inject(AdditionalPageInformationService);
  private readonly sensorService = inject(SensorService);
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly localStorageService = inject(LocalStorageService);
  private autoRefreshSub!: Subscription;
  protected readonly IconName = IconName;
  protected readonly sensorList = signal<SensorInformationResponse[] | null>(null);
  protected showRawBatteryReadings: boolean = false;
  protected showHiddenSensors: boolean = false;
  protected openDropDown: boolean = false;
  protected hiddenSensorsArray: string[] = [];
  protected readonly resolvedSensors = toSignal(
    this.route.data.pipe(map(({ sensors }) => sensors as SensorInformationResponse[])),
    { initialValue: null },
  );

  ngOnInit() {
    this.breadcrumbService.clearBreadcrumbs();
    this.breadcrumbService.addBreadcrumb('Sensors');
    this.hiddenSensorsArray = this.localStorageService.getHiddenSensors();
    this.additionalPageInformationService.setAdditionalInformation(
      `Last Updated: ${this.getTimeAsString()}`,
    );
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
        this.additionalPageInformationService.setAdditionalInformation(
          `Last Updated: ${this.getTimeAsString()}`,
        );
        this.sensorList.set(result);
      },
    });
  }

  toggleRawBattery() {
    this.showRawBatteryReadings = !this.showRawBatteryReadings;
    this.openDropDown = false;
  }

  toggleHiddenSensors() {
    this.showHiddenSensors = !this.showHiddenSensors;
    this.openDropDown = false;
  }

  hideSensor(sensorId: string) {
    this.localStorageService.addHiddenSensor(sensorId);
    this.hiddenSensorsArray = this.localStorageService.getHiddenSensors();
  }

  unHideSensor(sensorId: string) {
    this.localStorageService.removeHiddenSensor(sensorId);
    this.hiddenSensorsArray = this.localStorageService.getHiddenSensors();
  }

  ngOnDestroy() {
    this.autoRefreshSub?.unsubscribe();
  }
}
