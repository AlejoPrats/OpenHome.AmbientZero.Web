import { TEMPERATURE_CHART_FIXTURE } from "../fixtures/temperature-chart-fixture";
import { OnboardingStep } from "../models/onboarding-step";

export const ONBOARDING_NAVBAR_TOUR_STEPS: OnboardingStep[] = [
  {
    element: '#nav-temperature-chart',
    title: 'temperature-chart-nav',
    navigateTo: '/',
    description: 'temperature-chart-nav-desc',
    position: 'right'
  },
  {
    element: '#nav-sensors',
    title: 'sensors-nav',
    navigateTo: '/',
    description: 'sensors-nav-desc',
    position: 'right'
  },
  {
    element: '#nav-basic-settings',
    title: 'basic-nav-settings',
    navigateTo: '/',
    description: 'basic-settings-nav-desc',
    position: 'right'
  },
  {
    element: '#nav-advanced-settings',
    title: 'advanced-settings-nav',
    navigateTo: '/',
    description: 'advanced-settings-nav-desc',
    position: 'right'
  },
  {
    element: '#nav-help',
    title: 'help-nav',
    navigateTo: '/',
    description: 'help-desc-nav',
    position: 'right'
  }
]