import { SENSOR_INFORMATION_FIXTURE } from "../fixtures/sensor-information-fixture";
import { OnboardingStep } from "../models/onboarding-step";

export const ONBOARDING_SENSORS_TOUR_STEPS: OnboardingStep[] = [
    {
        title: 'sensors',
        description: 'sensors-desc',
        navigateTo: '/list',
        data: SENSOR_INFORMATION_FIXTURE,
        position: 'right'
    },
    {
        element: '#sensor-name',
        title: 'sensors-table-name',
        description: 'sensors-table-name-desc',
        navigateTo: '/list',
        position: 'right'
    },
    {
        element: '#sensor-battery',
        title: 'sensors-table-battery',
        description: 'sensors-table-battery-desc',
        navigateTo: '/list',
        position: 'right'
    },
    {
        element: '#sensor-last-reading',
        title: 'sensors-table-last-reading',
        description: 'sensors-table-last-reading-desc',
        navigateTo: '/list',
        position: 'right'
    },
    {
        element: '#sensor-temperature',
        title: 'sensors-table-temperature',
        description: 'sensors-table-temperature-desc',
        navigateTo: '/list',
        position: 'right'
    },
    {
        element: '#sensor-signaling',
        title: 'sensors-table-signal',
        description: 'sensors-table-signal-desc',
        navigateTo: '/list',
        position: 'right'
    },
    {
        element: '#sensor-tendency',
        title: 'sensors-table-tendency',
        description: 'sensors-table-tendency-desc',
        navigateTo: '/list',
        position: 'right'
    },
    {
        element: '#sensor-actions',
        title: 'sensors-table-actions',
        description: 'sensors-table-actions-desc',
        navigateTo: '/list',
        position: 'right'
    },
    {
        element: '#sensor-info-row',
        title: 'sensors-table-row',
        description: 'sensors-table-row-desc',
        navigateTo: '/list',
        position: 'right'
    },
    {
        element: '#sensor-edit',
        title: 'sensors-table-actions-edit-name',
        description: 'sensors-table-actions-edit-name-desc',
        navigateTo: '/list',
        position: 'right'
    },
    {
        element: '#sensor-chart',
        title: 'sensors-table-actions-sensor-chart',
        description: 'sensors-table-actions-sensor-chart-desc',
        navigateTo: '/list',
        position: 'right'
    },
    {
        element: '#sensor-hide',
        title: 'sensors-table-actions-hide',
        description: 'sensors-table-actions-hide-desc',
        navigateTo: '/list',
        position: 'right'
    },
    {
        element: '#sensor-cog',
        title: 'sensors-table-actions-settings',
        description: 'sensors-table-actions-settings-desc',
        navigateTo: '/list',
        position: 'right'
    },
    {
        element: '#sensor-delete',
        title: 'sensors-table-actions-delete',
        description: 'sensors-table-actions-delete-desc',
        data: SENSOR_INFORMATION_FIXTURE,
        navigateTo: '/list',
        position: 'right'
    }
]