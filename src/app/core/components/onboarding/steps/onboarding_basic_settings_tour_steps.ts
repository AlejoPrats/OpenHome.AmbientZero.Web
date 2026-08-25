import { APPLICATION_BASIC_SETTINGS_FIXTURE } from "../fixtures/application_basic_settings_fixture";
import { OnboardingStep } from "../models/onboarding-step";

export const ONBOARDING_BASIC_SETTINGS_TOUR_STEPS: OnboardingStep[] = [
  {
    element: '#nav-temperature-chart',
    title: 'temperature-chart',
    navigateTo: '/settings',
    data: APPLICATION_BASIC_SETTINGS_FIXTURE,
    description: 'temperature-chart-desc',
    position: 'right'
  },
  {
    element: '#nav-sensors',
    title: 'sensors',
    navigateTo: '/settings',
    description: 'sensors-desc',
    position: 'right'
  },
  {
    element: '#nav-basic-settings',
    title: 'basic-settings',
    navigateTo: '/settings',
    description: 'basic-settings-desc',
    position: 'right'
  },
  {
    element: '#nav-advanced-settings',
    title: 'advanced-settings',
    navigateTo: '/settings',
    description: 'advanced-settings-desc',
    position: 'right'
  },
  {
    element: '#nav-help',
    title: 'help',
    navigateTo: '/settings',
    data: APPLICATION_BASIC_SETTINGS_FIXTURE,
    description: 'help-desc',
    position: 'right'
  }
]