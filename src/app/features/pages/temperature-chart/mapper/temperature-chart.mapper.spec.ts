import { ChartResponse } from '../../../../shared/interfaces/chart-response';
import { SensorDailyTemperatureResponse } from '../../../../shared/interfaces/sensor-daily-temperature-response';
import { buildTemperatureChartOption } from './temperature-chart.mapper';

describe('buildTemperatureChartOption', () => {
  let namedSensor: SensorDailyTemperatureResponse;
  let unnamedSensor: SensorDailyTemperatureResponse;
  let chartResponse: ChartResponse;

  const getLegendNames = () =>
    (buildTemperatureChartOption(chartResponse)['legend'] as { data: string[] }).data;

  const getSeriesNames = () =>
    (buildTemperatureChartOption(chartResponse)['series'] as { name: string }[]).map(
      (series) => series.name,
    );

  beforeEach(() => {
    namedSensor = {
      deviceId: 'test-device-1',
      sensorVirtualName: 'Test Sensor 1',
      temperatureReadings: [],
    };
    unnamedSensor = {
      deviceId: 'test-device-2',
      sensorVirtualName: null,
      temperatureReadings: [],
    };
    chartResponse = {
      minTemperature: 10,
      maxTemperature: 30,
      measurements: [namedSensor, unnamedSensor],
    };
  });

  it('should name each sensor in the legend, falling back to its device id', () => {
    expect(getLegendNames()).toEqual(['Test Sensor 1', 'test-device-2']);
  });

  it('should name each series like its legend entry', () => {
    expect(getSeriesNames()).toEqual(['Test Sensor 1', 'test-device-2']);
  });
});
