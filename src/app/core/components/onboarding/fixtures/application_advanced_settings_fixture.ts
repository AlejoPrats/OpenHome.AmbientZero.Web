import { AdvancedSettingsResponse } from "app/shared/interfaces/advanced-settings-response"

export const APPLICATION_ADVANCED_SETTINGS_FIXTURE: AdvancedSettingsResponse =
{
    generalSettings:
    {
        checkForUpdatesEnabled: true,
        automaticUpdatesEnabled: false,
        maxBatteryValue: 36024,
        minBatteryValue: 14915
    },
    accessPointSettings:
    {
        accessPointName: "AmbientZero",
        accessPointSecurity: 0,
        accessPointPassword: ''
    },
    applicationSecurity:
    {
        applicationSecurity: 1
    }
}