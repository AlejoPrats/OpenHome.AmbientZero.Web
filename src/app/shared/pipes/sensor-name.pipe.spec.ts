import { SensorNamePipe } from './sensor-name.pipe';

describe('SensorNamePipe', () => {
  let pipe: SensorNamePipe;

  beforeEach(() => {
    pipe = new SensorNamePipe();
  });

  it.each`
    name             | expected
    ${'Living Room'} | ${'Living Room'}
    ${'  Kitchen  '} | ${'Kitchen'}
    ${''}            | ${'test-device-1'}
    ${'   '}         | ${'test-device-1'}
    ${null}          | ${'test-device-1'}
  `('should show "$expected" when the name is "$name"', ({ name, expected }) => {
    expect(pipe.transform(name, 'test-device-1')).toBe(expected);
  });
});
