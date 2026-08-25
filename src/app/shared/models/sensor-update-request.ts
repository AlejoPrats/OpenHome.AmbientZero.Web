export class SensorUpdateRequest {
  deviceId: string;
  isLightEnabled: boolean;
  isScheduled: boolean;
  disableStartTime: string | null;
  disableEndTime: string | null;

  constructor(
    deviceId: string,
    isLightEnabled: boolean,
    isScheduled: boolean,
    disableStartTime: string | null,
    disableEndTime: string | null,
  ) {
    this.deviceId = deviceId;
    this.isLightEnabled = isLightEnabled;
    this.isScheduled = isScheduled;
    this.disableStartTime = disableStartTime;
    this.disableEndTime = disableEndTime;
  }
}
