export class NameUpdateRequest {
    deviceId: string;
    virtualName: string;

    constructor(deviceId:string, virtualName:string)
    {
        this.deviceId = deviceId;
        this.virtualName = virtualName;
    }
}
