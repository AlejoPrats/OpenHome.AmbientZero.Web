import { TestBed } from '@angular/core/testing';

import { OnboardingSetupService } from './onboarding-setup.service';

describe('OnboardingSetupService', () => {
  let service: OnboardingSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnboardingSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
