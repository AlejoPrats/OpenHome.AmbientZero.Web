export class NameUpdateRequest {
    deviceId: string;
    virtualName: string;

    constructor(sensorId:string, virtualName:string)
    {
        this.deviceId = sensorId;
        this.virtualName = virtualName;
    }
}
