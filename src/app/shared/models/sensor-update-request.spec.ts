import { SensorUpdateRequest } from './sensor-update-request';

describe('SensorUpdateRequest', () => {
  it('should create an instance', () => {
    expect(new SensorUpdateRequest('device-1', true, false, null, null)).toBeTruthy();
  });
});
