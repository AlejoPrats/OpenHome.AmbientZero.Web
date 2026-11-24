import { SensorInformationResponse } from '../interfaces/sensor-information-response';

export class MergeSensors {
  sensorId: string;
  sensorName: string;
  sensorsList: SensorInformationResponse[];
  isForceMerge: boolean;

  constructor(
    sensorId: string,
    sensorName: string,
    sensorList: SensorInformationResponse[],
    isForceMerge: boolean,
  ) {
    this.sensorId = sensorId;
    this.sensorName = sensorName;
    this.isForceMerge = isForceMerge;
    this.sensorsList = sensorList.filter((sensor) => sensor.deviceId !== sensorId);
  }
}
