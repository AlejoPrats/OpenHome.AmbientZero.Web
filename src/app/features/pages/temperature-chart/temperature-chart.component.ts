import { Component, inject, signal } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeService } from '../../../shared/services/theme.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { SensorDailyTemperatureResponse } from '../../../shared/interfaces/sensor-daily-temperature-response';
import { EchartsSeries } from '../../../shared/interfaces/echarts-series';
import { ECBasicOption } from 'echarts/types/dist/shared';
import { ChartResponse } from '../../../shared/interfaces/chart-response';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiDropdownSheet } from '@taiga-ui/addon-mobile';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiInputDateTime } from '@taiga-ui/kit';
import { TuiForm } from '@taiga-ui/layout';

@Component({
	selector: 'app-temperature-chart',
	imports: [
		ReactiveFormsModule,
		TuiDropdownSheet,
		TuiInputDateTime,
		NgxEchartsModule],
	templateUrl: './temperature-chart.component.html',
	styleUrl: './temperature-chart.component.less',
})
export class TemperatureChartComponent {
	readonly theme = inject(ThemeService);
	private readonly route = inject(ActivatedRoute);
	protected readonly open = signal(false);
	protected readonly control = new FormControl<TuiDay>(TuiDay.currentLocal());
	
	private readonly EMPTY_ECHARTS_OPTION: ChartOption = {
		tooltip: { trigger: 'axis' },
		legend: { data: [] as string[] },
		xAxis: { type: 'time', boundaryGap: [0, 0], data: [] },
		yAxis: { type: 'value', min: 20, max: 30 },
		grid: {
			left: 0,
			right: 0,
			top: 20,
			bottom: 40,
			containLabel: false,
		},
		series: [{
			name: '',
			smooth: true,
			type: 'line',
			data: [] as (string | number)[][],   // <‑‑ IMPORTANT
		}],
	};

	protected readonly options = toSignal(
		this.route.data.pipe(
			map(({ temperatureReadings }) => {
				const chartResponse = temperatureReadings as ChartResponse;
				const chartValues = chartResponse.measurements as SensorDailyTemperatureResponse[];
				let legendData: string[] = [];
				let legendSeries: EchartsSeries[] = [];
				for (let i = 0; i < chartValues.length; i++) {
					legendData.push(chartValues[i].sensorVirtualName!);
					legendSeries.push({ name: chartValues[i].sensorVirtualName!, smooth: true, type: 'line', data: chartValues[i].temperatureReadings.map(x => [new Date(x.date).toISOString(), x.temperature]) })
				}

				return ({
					tooltip: { trigger: 'axis' },
					legend: { data: legendData },
					xAxis: { type: 'time' },
					yAxis: { type: 'value', min: chartResponse.minTemperature, max: chartResponse.maxTemperature },
					grid: {
						left: 3,
						right: 3,
						top: 20,
						containLabel: false, // disables label padding
					},
					series: legendSeries,
				} satisfies ECBasicOption)
			}
			)
		),
		{ initialValue: this.EMPTY_ECHARTS_OPTION },
	);

	protected readonly today = TuiDay.currentLocal();

}

type ChartOption = {
	tooltip: { trigger: string };
	legend: { data: string[] };
	xAxis: { type: string, boundaryGap: number[], data: string[] };
	yAxis: { type: string, min: number, max: number };
	grid: {
		left: number,
		right: number,
		top: number,
		bottom: number,
		containLabel: boolean, // disables label padding
	};
	series: {
		name: string;
		smooth: boolean;
		type: string;
		data: (string | number)[][];
	}[];
};