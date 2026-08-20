import { OnboardingStep } from "../models/onboarding-step";
import { ONBOARDING_ADVANCED_SETTINGS_TOUR_STEPS } from "./onboarding_advanced_settings_tour_steps";
import { ONBOARDING_BASIC_SETTINGS_TOUR_STEPS } from "./onboarding_basic_settings_tour_steps";
import { ONBOARDING_NAVBAR_TOUR_STEPS } from "./onboarding_navbar_tour_steps";
import { ONBOARDING_SENSORS_TOUR_STEPS } from "./onboarding_sensors_tour_steps";
import { ONBOARDING_TEMPERATURE_CHART_TOUR_STEPS } from "./onboarding_temperature_chart_tour_steps";

export const ONBOARDING_COMPLETE_TOUR_STEPS: OnboardingStep[] = [
    ...ONBOARDING_NAVBAR_TOUR_STEPS,
    ...ONBOARDING_TEMPERATURE_CHART_TOUR_STEPS,
    ...ONBOARDING_SENSORS_TOUR_STEPS,
    ...ONBOARDING_BASIC_SETTINGS_TOUR_STEPS,
    ...ONBOARDING_ADVANCED_SETTINGS_TOUR_STEPS,
];