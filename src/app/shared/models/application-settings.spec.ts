import { ApplicationSettings } from './application-settings';

describe('ApplicationSettings', () => {
  it('should create an instance', () => {
    expect(new ApplicationSettings('TestSetting', 'TestValue')).toBeTruthy();
  });
});
