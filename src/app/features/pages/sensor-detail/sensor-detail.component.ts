import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TuiTable } from '@taiga-ui/addon-table';
import { map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SensorInformationResponse } from '../../../shared/interfaces/sensor-information-response';
import { tuiCreateTimePeriods, TuiDataListWrapper, TuiInputTime, TuiSwitch, TuiButtonCopy } from '@taiga-ui/kit';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TuiButton, TuiFilterByInputOptions, TuiFilterByInputPipe, TuiExpand } from '@taiga-ui/core';
import { TuiTime } from '@taiga-ui/cdk';

@Component({
  selector: 'app-sensor-detail',
  imports: [DatePipe, DecimalPipe, TuiTable, TuiSwitch, FormsModule, TuiDataListWrapper, TuiFilterByInputPipe, TuiInputTime, TuiButton, TuiExpand],
  templateUrl: './sensor-detail.component.html',
  styleUrl: './sensor-detail.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensorDetailComponent {
  private readonly route = inject(ActivatedRoute);
  protected readonly sensorInformation = toSignal(
    this.route.data.pipe(map(({ sensorInformation }) => sensorInformation as SensorInformationResponse)),
    { initialValue: null },
  );
  protected items: readonly TuiTime[] = [
    ...tuiCreateTimePeriods(0, 23, [0, 15, 30, 45]),
  ];
  protected readonly filter: TuiFilterByInputOptions<TuiTime>['filter'] = (
    items,
    query,
  ) => items.filter((time) => time.toString('HH:MM').startsWith(query));
}
