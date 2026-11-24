import { ECBasicOption } from 'echarts/types/dist/shared';
import { ChartResponse } from '../../../../shared/interfaces/chart-response';
import { SensorDailyTemperatureResponse } from '../../../../shared/interfaces/sensor-daily-temperature-response';
import { EchartsSeries } from '../../../../shared/interfaces/echarts-series';

export function buildTemperatureChartOption(chartResponse: ChartResponse): ECBasicOption {
  const chartValues = chartResponse.measurements as SensorDailyTemperatureResponse[];

  const legendData: string[] = [];
  const legendSeries: EchartsSeries[] = [];

  for (const item of chartValues) {
    legendData.push(item.sensorVirtualName);

    legendSeries.push({
      name: item.sensorVirtualName,
      smooth: true,
      type: 'line',
      color: item.color,
      data: item.temperatureReadings.map((x) => [new Date(x.date).toISOString(), x.temperature]),
    });
  }

  return {
    tooltip: { trigger: 'axis' },
    legend: { data: legendData, type: 'scroll', bottom: 0 },
    xAxis: { type: 'time' },
    yAxis: {
      type: 'value',
      min: Math.floor(chartResponse.minTemperature),
      max: Math.ceil(chartResponse.maxTemperature),
    },
    grid: {
      left: 8,
      right: 16,
      top: 20,
      bottom: 40,
      containLabel: true,
    },
    series: legendSeries,
  };
}
