import { TemperatureReadings } from './temperature-readings';

export interface SensorDailyTemperatureResponse {
  deviceId: string;
  sensorVirtualName: string;
  color: string | null;
  temperatureReadings: TemperatureReadings[];
}
