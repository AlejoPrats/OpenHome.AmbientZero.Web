import { SensorInformationResponse } from "app/shared/interfaces/sensor-information-response";

export const SENSOR_INFORMATION_FIXTURE: SensorInformationResponse[] = [
    {
        id: 1,
        deviceId: "518d83d9-3447-4917-aad7-5fb8b3364bac",
        deviceVirtualName: "Sensor 1",
        adcReading: 92,
        isSignaling: false,
        lastReadingTime: new Date,
        lastReadingValue: 25.5,
        temperatureTendency: "ascending",
        version: "1.0.0",
        sensorSetting: {
            isLightEnabled: true,
            isScheduled: false,
            disableStartTime: "",
            disableEndTime: ""
        }
    },
    {
        id: 2,
        deviceId: "c1c9b1c4-7f3e-4f0e-9b7a-1a2f3b4c5d6e",
        deviceVirtualName: "Sensor 2",
        adcReading: 47,
        isSignaling: true,
        lastReadingTime: new Date,
        lastReadingValue: 27.9,
        temperatureTendency: "descending",
        version: "1.0.0",
        sensorSetting: {
            isLightEnabled: true,
            isScheduled: false,
            disableStartTime: "",
            disableEndTime: ""
        }
    }

]