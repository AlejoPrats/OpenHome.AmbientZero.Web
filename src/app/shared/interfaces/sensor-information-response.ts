import { SensorSettingsResponse } from "./sensor-settings-response"

export interface SensorInformationResponse {
        id:number
        deviceId:string 
        deviceVirtualName:string|null 
        aDCReading:number
        isSignaling:boolean
        lastReadingTime:Date
        lastReadingValue:number 
        temperatureTendency:string
        sensorSetting:SensorSettingsResponse
}
