import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { OnboardingService } from '../services/driver.service';

export const onboardingGuard: CanActivateFn = () => {
  const onboarding = inject(OnboardingService);

  const firstTime = !localStorage.getItem('onboarding_done');

  if (firstTime) {
    onboarding.start();
    //localStorage.setItem('onboarding_done', 'true');
  }

  return true;
};
