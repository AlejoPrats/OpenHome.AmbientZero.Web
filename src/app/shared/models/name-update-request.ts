export class NameUpdateRequest {
    sensorId: string;
    virtualName: string;

    constructor(sensorId:string, virtualName:string)
    {
        this.sensorId = sensorId;
        this.virtualName = virtualName;
    }
}
