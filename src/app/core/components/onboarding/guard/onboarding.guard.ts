import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { OnboardingService } from '../services/driver.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { OnboardingSetupService } from 'app/shared/services/onboarding-setup.service';
import { ONBOARDING_SETUP_STEPS } from '../steps/onboarding_setup_steps';
import { ONBOARDING_COMPLETE_TOUR_STEPS } from '../steps/onboarding_complete_tour_steps';

export const onboardingGuard: CanActivateFn = () => {
  const localStorageService = inject(LocalStorageService);

  if (localStorageService.getOnboardingRunning()) {
    return true;
  }

  const onboarding = inject(OnboardingService);
  const onboardingSetupService = inject(OnboardingSetupService);
  const handleOnboard = () => {
    onboarding.clearSteps();

    if (isSetupPending) {
      onboarding.addStepCollection(ONBOARDING_SETUP_STEPS);
    }

    if (isTourPending) {
      onboarding.addStepCollection(ONBOARDING_COMPLETE_TOUR_STEPS);
    }

    if (isSetupPending || isTourPending) {
      onboarding.start()
      localStorageService.setOnboardingRunning(true);
    }
  };

  let isSetupPending = localStorageService.getOnboaringSetupStatus();
  let isTourPending = localStorageService.getOnboaringTourStatus();

  if (isSetupPending === null || isTourPending === null) {
    onboardingSetupService.validateOnboarding().subscribe({
      next: (result) => {
        localStorageService.setOnboardingSetupStatus(result.isSetupPending);
        localStorageService.setOnboardingTourStatus(result.isApplicationTourPending);
        isSetupPending = result.isSetupPending;
        isTourPending = result.isApplicationTourPending;
        handleOnboard();
      }
    });
  }
  else {
    handleOnboard();
  }

  return true;
};
