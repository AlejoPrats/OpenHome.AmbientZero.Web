import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TuiTable } from '@taiga-ui/addon-table';
import { map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SensorInformationResponse } from '../../../shared/interfaces/sensor-information-response';
import { tuiCreateTimePeriods, TuiDataListWrapper, TuiInputTime, TuiSwitch, TuiButtonCopy } from '@taiga-ui/kit';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TuiButton, TuiFilterByInputOptions, TuiFilterByInputPipe, TuiExpand, TuiDialog, TuiNotificationService } from '@taiga-ui/core';
import { TuiAutoFocus, TuiTime } from '@taiga-ui/cdk';
import { SensorService } from '../../../shared/services/sensor.service';
import { NameUpdateRequest } from '../../../shared/models/name-update-request';
import { SensorUpdateRequest } from '../../../shared/models/sensor-update-request';

@Component({
  selector: 'app-sensor-detail',
  imports: [DatePipe,
    DecimalPipe,
    TuiTable,
    TuiSwitch,
    FormsModule,
    TuiDataListWrapper,
    TuiFilterByInputPipe,
    TuiInputTime,
    TuiButton,
    TuiExpand,
    TuiDialog,
    TuiAutoFocus],
  templateUrl: './sensor-detail.component.html',
  styleUrl: './sensor-detail.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensorDetailComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly sensorService = inject(SensorService)
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly notificationService = inject(TuiNotificationService);
  protected changeNameModalOpen = false;
  protected tempSensorVirtualName: string = '';
  protected disableStartTime: string | null = null;
  protected disableEndTime: string | null = null;

  protected readonly sensorInformation = toSignal(
    this.route.data.pipe(map(({ sensorInformation }) => sensorInformation as SensorInformationResponse)),
    { initialValue: null },
  );

  ngOnInit(): void {
    this.disableStartTime = fromApiTime(this.sensorInformation()?.sensorSetting?.disableStartTime);
    this.disableEndTime = fromApiTime(this.sensorInformation()?.sensorSetting?.disableEndTime);
  }

  protected items: readonly TuiTime[] = [
    ...tuiCreateTimePeriods(0, 23, [0, 15, 30, 45]),
  ];

  protected readonly filter: TuiFilterByInputOptions<TuiTime>['filter'] = (
    items,
    query,
  ) => items.filter((time) => time.toString('HH:MM').startsWith(query));

  protected showNameUpdateDialog() {
    this.changeNameModalOpen = true;
    this.tempSensorVirtualName = this.sensorInformation()?.deviceVirtualName ?? '';
  }

  protected hideNameUpdateDialog() {
    this.changeNameModalOpen = false;
  }

  protected updateVirtualName() {
    this.changeNameModalOpen = false;
    this.sensorService.updateSensorName(new NameUpdateRequest(this.sensorInformation()!.deviceId, this.tempSensorVirtualName)).subscribe({
      next: () => {
        this.sensorInformation()!.deviceVirtualName = this.tempSensorVirtualName;
        this.notificationService.open('Device Name Saved Succesfully', { label: 'Notification', appearance: 'positive', block: 'end', inline: 'end', autoClose: 5000 }).subscribe();
        this.cdr.detectChanges();
      }
    });
  }

  protected saveSensorSettings() {
    const sensor = this.sensorInformation()!;
    this.sensorService.saveSensorSettings(new SensorUpdateRequest(
      sensor.deviceId,
      sensor.sensorSetting.isLightEnabled,
      sensor.sensorSetting.isScheduled,
      sensor.sensorSetting.isScheduled ? toApiTime(this.disableStartTime) : null,
      sensor.sensorSetting.isScheduled ? toApiTime(this.disableEndTime) : null)).subscribe({
        next: () => {
          this.notificationService.open('Sensor Settings Saved Succesfully', { label: 'Notification', appearance: 'positive', block: 'end', inline: 'end', autoClose: 5000 }).subscribe();
        }
      })
  }
}

export const toApiTime = (t: string | null): string | null =>
  t ? `${t.toString()}:00` : null;

export const fromApiTime = (t: string|undefined): string | null =>
  t ? `${t.split(':')[0]}:${t.split(':')[1]}` : null;