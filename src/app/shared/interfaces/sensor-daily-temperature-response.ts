import { TemperatureReadings } from './temperature-readings';

export interface SensorDailyTemperatureResponse {
  deviceId: string;
  sensorVirtualName: string | null;
  color: string | null;
  temperatureReadings: TemperatureReadings[];
}
