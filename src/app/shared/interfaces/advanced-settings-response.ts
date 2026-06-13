import { AccessPointSettingsResponse } from "./access-point-settings-response";
import { ApplicationSecurityResponse } from "./application-security-response";
import { GeneralSettingsResponse } from "./general-settings-response";

export interface AdvancedSettingsResponse {
    generalSettings: GeneralSettingsResponse;
    accessPointSettings: AccessPointSettingsResponse;
    applicationSecurity: ApplicationSecurityResponse;
}
