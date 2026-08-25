import { TestBed } from '@angular/core/testing';

import { OnboardingService } from './driver.service';

describe('DriverServiceService', () => {
  let service: OnboardingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnboardingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
