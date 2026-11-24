import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiResponsiveDialogService } from '@taiga-ui/addon-mobile';
import { TuiButton, TuiCheckbox, TuiDialogContext, tuiItemsHandlersProvider } from '@taiga-ui/core';
import {
  TUI_CONFIRM,
  TuiChevron,
  TuiConfirmData,
  TuiDataListWrapper,
  TuiSelect,
} from '@taiga-ui/kit';
import { injectContext } from '@taiga-ui/polymorpheus';
import { NotificationService } from 'app/core/services/notification-service.service';
import { SensorInformationResponse } from 'app/shared/interfaces/sensor-information-response';
import { MergeSensors } from 'app/shared/models/merge-sensors';
import { MergeSensorsRequest } from 'app/shared/models/merge-sensors-request';
import { SensorService } from 'app/shared/services/sensor.service';

@Component({
  selector: 'app-merge-sensors-modal',
  imports: [FormsModule, TuiChevron, TuiDataListWrapper, TuiSelect, TuiButton, TuiCheckbox],
  templateUrl: './merge-sensors-modal.component.html',
  styleUrl: './merge-sensors-modal.component.less',
  providers: [
    tuiItemsHandlersProvider({
      stringify: signal((x: SensorInformationResponse) =>
        x.isMigrated
          ? `${x.deviceVirtualName ?? x.deviceId} (*)`
          : (x.deviceVirtualName ?? x.deviceId),
      ),
      identityMatcher: signal(
        (a: SensorInformationResponse, b: SensorInformationResponse) => a.id === b.id,
      ),
    }),
  ],
})
export class MergeSensorsModalComponent {
  protected readonly context = injectContext<TuiDialogContext<void, MergeSensors>>();
  protected sensors: SensorInformationResponse[] = [];
  protected value: SensorInformationResponse | null = null;
  protected isForceMerge: boolean = this.context.data.isForceMerge;

  private readonly dialog = inject(TuiResponsiveDialogService);
  private readonly sensorService = inject(SensorService);
  private readonly notificationService = inject(NotificationService);

  constructor() {
    this.getSensorsForList(this.context.data.isForceMerge);
  }

  submit() {
    const data: TuiConfirmData = {
      content: `
      <p>This process will make all the information from the sensor ${this.context.data.sensorName} be inside the sensor ${this.value?.deviceVirtualName} and the sensor ${this.context.data.sensorName} will disapear from the list</p>
      <p>Are you sure you want to proceed?</p>`,
      yes: 'Yes',
      no: 'No',
    };

    this.dialog
      .open<boolean>(TUI_CONFIRM, {
        label: `Merge ${this.context.data.sensorName} into ${this.value?.deviceVirtualName}?`,
        size: 'm',
        data,
      })
      .subscribe((result) => {
        if (result) {
          this.sensorService
            .mergeSensors(new MergeSensorsRequest(this.context.data.sensorId, this.value!.deviceId))
            .subscribe({
              next: () => {
                this.notificationService
                  .Message(
                    `${this.context.data.sensorName} merged into ${this.value?.deviceVirtualName}`,
                    'Success',
                  )
                  .SuccessType()
                  .BottomRight()
                  .Show();
                this.context.completeWith();
              },
              error: () => {
                this.notificationService
                  .Message(
                    `${this.context.data.sensorName} did not merge into ${this.value?.deviceVirtualName}`,
                    'Error',
                  )
                  .ErrorType()
                  .BottomRight()
                  .Show();
              },
            });
        }
      });
  }

  getSensorsForList(value: boolean) {
    if (value) {
      this.sensors = this.context.data.sensorsList;
    } else {
      this.sensors = this.context.data.sensorsList.filter((sensor) => !sensor.isMigrated);
    }
  }
}
