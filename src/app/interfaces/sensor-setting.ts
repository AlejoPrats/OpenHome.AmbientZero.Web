export interface SensorSetting {
    deviceId:string,
    isLightEnabled: boolean,
    isScheduled: boolean,
    disableStartTime: string|null,
    disableEndTime: string|null
}
