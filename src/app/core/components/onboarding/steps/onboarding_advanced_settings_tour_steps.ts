import { APPLICATION_ADVANCED_SETTINGS_FIXTURE } from "../fixtures/application_advanced_settings_fixture";
import { OnboardingStep } from "../models/onboarding-step";

export const ONBOARDING_ADVANCED_SETTINGS_TOUR_STEPS: OnboardingStep[] = [
  {
    title: 'advanced-settings-nav',
    navigateTo: '/advancedSettings',
    data: APPLICATION_ADVANCED_SETTINGS_FIXTURE,
    description: 'advanced-settings-desc',
    position: 'right'
  },
  {
    element: '#advanced-settings-general-tab',
    title: 'advanced-settings-general-tab',
    navigateTo: '/advancedSettings',
    description: 'temperature-chart-desc',
    position: 'right'
  }, {
    element: '#advanced-settings-update-section',
    title: 'advanced-settings-update-section',
    navigateTo: '/advancedSettings',
    description: 'advanced-settings-update-section-desc',
    position: 'right'
  }, {
    element: '#advanced-settings-battery-section',
    title: 'advanced-settings-battery-section',
    navigateTo: '/advancedSettings',
    description: 'advanced-settings-battery-section-desc',
    position: 'right'
  }, {
    element: '#advanced-settings-vesrsion-section',
    title: 'advanced-settings-vesrsion-section',
    navigateTo: '/advancedSettings',
    description: 'advanced-settings-vesrsion-section-desc',
    position: 'right'
  }, {
    element: '#advanced-settings-backup-section',
    title: 'advanced-settings-backup-section',
    navigateTo: '/advancedSettings',
    description: 'advanced-settings-backup-section-desc',
    position: 'right'
  }, {
    element: '#advanced-settings-network-tab',
    title: 'advanced-settings-network-tab',
    shouldClick: true,
    navigateTo: '/advancedSettings',
    description: 'advanced-settings-network-tab-desc',
    position: 'right'
  }, {
    element: '#advanced-settings-ap-section',
    title: 'advanced-settings-ap-section',
    navigateTo: '/advancedSettings',
    description: 'advanced-settings-ap-section-desc',
    position: 'right'
  }, {
    element: '#advanced-settings-security-tab',
    title: 'advanced-settings-security-tab',
    shouldClick: true,
    navigateTo: '/advancedSettings',
    description: 'advanced-settings-security-tab-desc',
    position: 'right'
  }, {
    element: '#advanced-settings-system-password-section',
    title: 'advanced-settings-system-password-section',
    navigateTo: '/advancedSettings',
    description: 'advanced-settings-system-password-section-desc',
    position: 'right'
  }, {
    element: '#advanced-settings-application-security-section',
    title: 'advanced-settings-application-security-section',
    navigateTo: '/advancedSettings',
    description: 'advanced-settings-application-security-section-desc',
    position: 'right'
  }, {
    element: '#advanced-settings-users-tab',
    title: 'advanced-settings-users-tab',
    navigateTo: '/advancedSettings',
    description: 'advanced-settings-users-tab-desc',
    position: 'right'
  }, {
    element: '#advanced-settings-dashboard-tab',
    title: 'advanced-settings-dashboard-tab',
    navigateTo: '/advancedSettings',
    data: APPLICATION_ADVANCED_SETTINGS_FIXTURE,
    description: 'advanced-settings-dashboard-tab-desc',
    position: 'right'
  }
]