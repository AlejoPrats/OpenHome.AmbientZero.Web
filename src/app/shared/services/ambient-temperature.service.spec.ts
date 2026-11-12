import { TestBed } from '@angular/core/testing';

import { AmbientTemperatureService } from './ambient-temperature.service';

describe('AmbientTemperatureService', () => {
  let service: AmbientTemperatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmbientTemperatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
