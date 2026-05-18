import { SensorDailyTemperatureResponse } from "./sensor-daily-temperature-response";

export interface ChartResponse {
    maxTemperature:number,
    minTemperature:number,
    measurements:SensorDailyTemperatureResponse[]
}
