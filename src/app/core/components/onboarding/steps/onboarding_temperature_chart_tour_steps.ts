import { TEMPERATURE_CHART_FIXTURE } from "../fixtures/temperature-chart-fixture";
import { OnboardingStep } from "../models/onboarding-step";

export const ONBOARDING_TEMPERATURE_CHART_TOUR_STEPS: OnboardingStep[] = [
    {
        title: 'temperature-chart',
        description: 'temperature-chart-desc',
        navigateTo: '/chart',
        data: TEMPERATURE_CHART_FIXTURE,
        position: 'right'
    },
    {
        element: '#chart-canvas',
        title: 'temperature-chart-canvas',
        description: 'temperature-chart-canvas-desc',
        navigateTo: '/chart',
        canInteract: true,
        position: 'right'
    },
    {
        element: '#chart-controls',
        title: 'temperature-chart-controls',
        description: 'temperature-chart-controls-desc',
        navigateTo: '/chart',
        position: 'right'
    },
    {
        element: '#chart-previous-day',
        title: 'temperature-chart-previous-day',
        description: 'temperature-chart-previous-day-desc',
        navigateTo: '/chart',
        position: 'right'
    },
    {
        element: '#chart-next-day',
        title: 'temperature-chart-next-day',
        description: 'temperature-chart-next-day-desc',
        navigateTo: '/chart',
        position: 'right'
    },
    {
        element: '#chart-date-picker',
        title: 'temperature-chart-date-picker',
        description: 'temperature-chart-date-picker-desc',
        data: TEMPERATURE_CHART_FIXTURE,
        navigateTo: '/chart',
        position: 'right'
    }
]