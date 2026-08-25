import { SensorInformationResponse } from "app/shared/interfaces/sensor-information-response";
import { ApplicationSettings } from "app/shared/models/application-settings";

export const APPLICATION_BASIC_SETTINGS_FIXTURE: ApplicationSettings[] = [
    new ApplicationSettings('TemperatureSetting', '0'),
    new ApplicationSettings('TimeZone', 'UTC')
]