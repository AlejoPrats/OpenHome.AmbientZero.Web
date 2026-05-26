import {ECBasicOption} from 'echarts/types/dist/shared';
import { ChartResponse } from '../../../../shared/interfaces/chart-response';
import { SensorDailyTemperatureResponse } from '../../../../shared/interfaces/sensor-daily-temperature-response';
import { EchartsSeries } from '../../../../shared/interfaces/echarts-series';

export function buildTemperatureChartOption(
  chartResponse: ChartResponse
): ECBasicOption {

  const chartValues = chartResponse.measurements as SensorDailyTemperatureResponse[];

  const legendData: string[] = [];
  const legendSeries: EchartsSeries[] = [];

  for (const item of chartValues) {
    legendData.push(item.sensorVirtualName!);

    legendSeries.push({
      name: item.sensorVirtualName!,
      smooth: true,
      type: 'line',
      data: item.temperatureReadings.map(x => [
        new Date(x.date).toISOString(),
        x.temperature,
      ]),
    });
  }

  return {
    tooltip: { trigger: 'axis' },
    legend: { data: legendData },
    xAxis: { type: 'time' },
    yAxis: {
      type: 'value',
      min: chartResponse.minTemperature,
      max: chartResponse.maxTemperature,
    },
    grid: {
      left: 3,
      right: 3,
      top: 20,
      containLabel: false,
    },
    series: legendSeries,
  };
}
