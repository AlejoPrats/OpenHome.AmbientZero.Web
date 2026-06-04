import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeService } from '../../../shared/services/theme.service';
import { ActivatedRoute } from '@angular/router';
import { ECBasicOption } from 'echarts/types/dist/shared';
import { ChartResponse } from '../../../shared/interfaces/chart-response';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiDropdownSheet } from '@taiga-ui/addon-mobile';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiInputDate } from '@taiga-ui/kit';
import { TuiButton } from '@taiga-ui/core';
import { AmbientTemperatureService } from '../../../shared/services/ambient-temperature.service';
import { buildTemperatureChartOption } from './mapper/temperature-chart.mapper';
import { EMPTY_ECHARTS_OPTION } from './constants/empty-echarts-option.constant';

@Component({
  selector: 'app-temperature-chart',
  imports: [
    ReactiveFormsModule,
    TuiDropdownSheet,
    TuiInputDate,
    FormsModule,
    TuiButton,
    NgxEchartsModule],
  templateUrl: './temperature-chart.component.html',
  styleUrl: './temperature-chart.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemperatureChartComponent {
  readonly theme = inject(ThemeService);
  private readonly route = inject(ActivatedRoute);
  private readonly ambientTemperatureService = inject(AmbientTemperatureService);
  readonly options = signal<ECBasicOption>(EMPTY_ECHARTS_OPTION);
  protected displayDate = TuiDay.currentLocal();

  constructor() {
    this.route.data.subscribe(({ temperatureReadings }) => {
      const chartResponse = temperatureReadings as ChartResponse;
      this.options.set(buildTemperatureChartOption(chartResponse));
    });
  }

  protected nextDay() {
    this.displayDate = this.displayDate.append({ day: 1 });
    this.updateChartData();
  }

  protected previousDay() {
    this.displayDate = this.displayDate.append({ day: -1 })
    this.updateChartData();
  }

  protected selectedDate(value: TuiDay) {
    this.updateChartData();
  }

  protected today() {
    this.displayDate = TuiDay.currentLocal();
    this.updateChartData();
  }

  private updateChartData() {
    this.ambientTemperatureService.getDailyTemperatures(this.displayDate).subscribe({
      next: (temperatureReadings) => {
        const chartResponse = temperatureReadings as ChartResponse;
        this.options.set(buildTemperatureChartOption(chartResponse));
      },
    });
  }
}
