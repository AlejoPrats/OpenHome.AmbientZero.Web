import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { SensorInformationResponse } from '../../../shared/interfaces/sensor-information-response';
import { DatePipe, DecimalPipe } from '@angular/common'

@Component({
  selector: 'app-sensor-list',
  imports: [DatePipe,DecimalPipe],
  templateUrl: './sensor-list.html',
  styleUrl: './sensor-list.less',
})
export class SensorList {
  private readonly route = inject(ActivatedRoute);
  protected readonly sensorLists = toSignal(
    this.route.data.pipe(map(({ sensors }) => sensors as SensorInformationResponse[])),
    { initialValue: null },
  );

}
