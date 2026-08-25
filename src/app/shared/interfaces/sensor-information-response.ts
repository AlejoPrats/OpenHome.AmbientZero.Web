import { SensorSettingsResponse } from './sensor-settings-response';

export interface SensorInformationResponse {
        id: number;
        deviceId: string;
        deviceVirtualName: string | null;
        adcReading: number;
        isSignaling: boolean;
        lastReadingTime: Date;
        lastReadingValue: number;
        temperatureTendency: string;
        version: string;
        sensorSetting: SensorSettingsResponse;
}
