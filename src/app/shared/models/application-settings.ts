export class ApplicationSettings {
  settingName: string;
  settingValue: string;

  constructor(settingName: string, settingValue: string) {
    this.settingName = settingName;
    this.settingValue = settingValue;
  }
}
