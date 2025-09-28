import { SensorSetting } from "./sensor-setting";

export interface SensorInformation {
    id: number,
    deviceId : string,
    deviceVirtualName: string|null,
    adcReading: number,
    isSignaling: boolean,
    lastReadingTime: string,
    lastReadingValue: number,
    temperatureTendency: string,
    sensorSetting: SensorSetting
}

