import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { SensorInformationResponse } from '../../../shared/interfaces/sensor-information-response';
import { DatePipe, DecimalPipe } from '@angular/common'
import { IconComponent } from "../../../shared/components/icon/icon.component";
import { IconName } from '../../../shared/components/icon/icon-name.enum';

@Component({
  selector: 'app-sensor-list',
  imports: [DatePipe, DecimalPipe, IconComponent],
  templateUrl: './sensor-list.html',
  styleUrl: './sensor-list.less',
})
export class SensorList {
  private readonly route = inject(ActivatedRoute);
  protected readonly IconName = IconName;
  protected readonly sensorLists = toSignal(
    this.route.data.pipe(map(({ sensors }) => sensors as SensorInformationResponse[])),
    { initialValue: null },
  );

}
