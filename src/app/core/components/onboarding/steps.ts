import { OnboardingAdminPasswordComponent } from "./components/onboarding-admin-password/onboarding-admin-password.component";
import { OnboardingLanguageSelectorComponent } from "./components/onboarding-language-selector/onboarding-language-selector.component";
import { OnboardingTimezoneSelectorComponent } from "./components/onboarding-timezone-selector/onboarding-timezone-selector.component";
import { OnboardingUnitSelectorComponent } from "./components/onboarding-unit-selector/onboarding-unit-selector.component";
import { OnboardingStep } from "./models/onboarding-step";

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    element: '#settings-button',
    title: 'Settings',
    description: 'Configure your preferences here.',
    position: 'left'
  },
  {
    element: '#navbar-home',
    title: 'configure',
    description: '<strong>This takes you to the dashboard.</strong><br/><input type="text" />',
    position: 'bottom',
    data: null,
    component: OnboardingLanguageSelectorComponent
  },
  {
    element: '#navbar-home',
    title: 'configure',
    description: '<strong>This takes you to the dashboard.</strong><br/><input type="text" />',
    position: 'bottom',
    data: null,
    component: OnboardingTimezoneSelectorComponent
  },
  {
    element: '#navbar-home',
    title: 'configure',
    description: '<strong>This takes you to the dashboard.</strong><br/><input type="text" />',
    position: 'bottom',
    data: null,
    component: OnboardingUnitSelectorComponent
  },
  {
    element: '#navbar-home',
    title: 'configure',
    description: '<strong>This takes you to the dashboard.</strong><br/><input type="text" />',
    position: 'bottom',
    data: null,
    component: OnboardingAdminPasswordComponent
  }
];
