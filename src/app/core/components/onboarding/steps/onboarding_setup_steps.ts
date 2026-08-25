import { OnboardingAdminPasswordComponent } from "../components/onboarding-admin-password/onboarding-admin-password.component";
import { OnboardingLanguageSelectorComponent } from "../components/onboarding-language-selector/onboarding-language-selector.component";
import { OnboardingSetupEndComponent } from "../components/onboarding-setup-end/onboarding-setup-end.component";
import { OnboardingTimezoneSelectorComponent } from "../components/onboarding-timezone-selector/onboarding-timezone-selector.component";
import { OnboardingUnitSelectorComponent } from "../components/onboarding-unit-selector/onboarding-unit-selector.component";
import { OnboardingStep } from "../models/onboarding-step";

export const ONBOARDING_SETUP_STEPS: OnboardingStep[] = [
  {
    element: '#settings-button',
    title: 'Settings',
    description: 'Configure your preferences here.',
    position: 'left'
  },
  {
    element: '#navbar-home',
    title: 'configure',
    position: 'bottom',
    component: OnboardingLanguageSelectorComponent
  },
  {
    element: '#navbar-home',
    title: 'configure',
    position: 'bottom',
    component: OnboardingTimezoneSelectorComponent
  },
  {
    element: '#navbar-home',
    title: 'configure',
    position: 'bottom',
    component: OnboardingUnitSelectorComponent
  },
  {
    element: '#navbar-home',
    title: 'configure',
    position: 'bottom',
    component: OnboardingAdminPasswordComponent
  },
  {
    element: '#navbar-home',
    title: 'configure',
    position: 'bottom',
    component: OnboardingSetupEndComponent
  }
];
