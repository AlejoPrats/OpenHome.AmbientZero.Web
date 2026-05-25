import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { SensorInformationResponse } from '../../../shared/interfaces/sensor-information-response';
import { DatePipe, DecimalPipe } from '@angular/common';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { IconName } from '../../../shared/components/icon/icon-name.enum';
import { TuiResponsiveDialogService } from '@taiga-ui/addon-mobile';
import { TUI_CONFIRM, TuiConfirmData } from '@taiga-ui/kit';
import { SensorService } from '../../../shared/services/sensor.service';

@Component({
  selector: 'app-sensor-list',
  imports: [DatePipe, DecimalPipe, IconComponent, RouterLink, RouterModule],
  templateUrl: './sensor-list.component.html',
  styleUrl: './sensor-list.component.less',
})
export class SensorListComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly dialogs = inject(TuiResponsiveDialogService);
  private readonly sensorService = inject(SensorService);
  protected readonly IconName = IconName;
  protected readonly sensorLists = toSignal(
    this.route.data.pipe(map(({ sensors }) => sensors as SensorInformationResponse[])),
    { initialValue: null },
  );

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
        const index = this.sensorLists()?.findIndex((x) => x.id == id);
        this.sensorLists()?.splice(index!, 1);
      },
    });
  }
}
