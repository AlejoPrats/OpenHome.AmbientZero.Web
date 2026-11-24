export class MergeSensorsRequest {
  originDeviceId: string;
  destinyDeviceId: string;

  constructor(originDeviceId: string, destinyDeviceId: string) {
    this.originDeviceId = originDeviceId;
    this.destinyDeviceId = destinyDeviceId;
  }
}
