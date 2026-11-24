export class NetworkUpdateRequest {
  ssid: string;
  password: string;
  channel: number;
  country: string;
  apSecurity: number;

  constructor(
    ssid: string,
    password: string,
    channel: number,
    country: string,
    aPSecurity: number,
  ) {
    this.ssid = ssid;
    this.password = password;
    this.channel = channel;
    this.country = country;
    this.apSecurity = aPSecurity;
  }
}
