import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../constants/storage-keys.constants';
import { number } from 'echarts';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  //#region Token

  getAuthenticationToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.TOKEN_STORAGE);
  }

  setAuthenticationToken(token: string) {
    localStorage.setItem(STORAGE_KEYS.TOKEN_STORAGE, token);
  }

  //#endregion

  //#region Timer
  setTimer(timerName: string, timerSpan: number) {
    localStorage.setItem(STORAGE_KEYS.TIMER_PREFIX + timerName, timerSpan.toString());
  }

  getTimer(timerName: string): number | null {
    const raw = localStorage.getItem(STORAGE_KEYS.TIMER_PREFIX + timerName);
    return raw ? Number(raw) : null;
  }

  removeTimer(timerName: string) {
    localStorage.removeItem(STORAGE_KEYS.TIMER_PREFIX + timerName);
  }

  //#endregion

  //#region LoginAttempts
  getLoginAttempts(): number {
    const raw = localStorage.getItem(STORAGE_KEYS.LOGIN_ATTEMPTS);
    return raw ? Number(raw) : 0;
  }

  setLoginAttempts(count: number): void {
    localStorage.setItem(STORAGE_KEYS.LOGIN_ATTEMPTS, count.toString());
  }

  clearLoginAttempts(): void {
    localStorage.removeItem(STORAGE_KEYS.LOGIN_ATTEMPTS);
  }

  //#endregion

  //#region Language
  getLanguage(): string | null {
    return localStorage.getItem(STORAGE_KEYS.LANGUAGE);
  }

  setLanguage(language: string): void {
    if (language) {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
    }
    else {
      localStorage.removeItem(STORAGE_KEYS.LANGUAGE);
    }
  }

  //#endregion

  //#region Onboarding Setup Status
  getOnboaringSetupStatus(): boolean | null {
    const onboarding_stauts = localStorage.getItem(STORAGE_KEYS.ONBOARDING_SETUP_PENDING);

    if (onboarding_stauts) {
      return onboarding_stauts == 'true';
    }

    return null;
  }

  setOnboardingSetupStatus(onboardingSetupStatus: boolean) {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_SETUP_PENDING, onboardingSetupStatus.toString());
  }

  //#endregion

  //#region Onboarding Tour Status
  getOnboaringTourStatus(): boolean | null {
    const onboarding_stauts = localStorage.getItem(STORAGE_KEYS.ONBOARDING_TOUR_PENDING);

    if (onboarding_stauts) {
      return onboarding_stauts == 'true';
    }

    return null;
  }

  setOnboardingTourStatus(onboardingTourStatus: boolean) {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_TOUR_PENDING, onboardingTourStatus.toString());
  }

  //#endregion

  //#region Onboarding Tour Data Mode
  getOnboardingTourDataMode(): boolean {
    const onboarding_stauts = localStorage.getItem(STORAGE_KEYS.ONBOARDING_TOUR_DATAMODE);

    if (onboarding_stauts) {
      return onboarding_stauts == 'true';
    }

    return false;
  }

  setOnboardingTourDataMode(onboardingTourDataMode: boolean) {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_TOUR_DATAMODE, onboardingTourDataMode.toString());
  }
  //#endregion

  //#region Onboarding Tour Data
  getOnboardingTourData(): any {
    const onboarding_tour_data = localStorage.getItem(STORAGE_KEYS.ONBOARDING_TOUR_DATA);

    if (onboarding_tour_data) {
      return JSON.parse(onboarding_tour_data);
    }

    return null;
  }

  setOnboardingTourData(object: any) {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_TOUR_DATA, JSON.stringify(object));
  }
  //#endregion

  //#region Onboarding Running
  getOnboardingRunning(): boolean {
    const onboarding_running = localStorage.getItem(STORAGE_KEYS.ONBOARDING_RUNNING);

    if (onboarding_running === null) {
      return false;
    }

    return onboarding_running === 'true';
  }

  setOnboardingRunning(onboardingRunning: boolean) {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_RUNNING, onboardingRunning.toString());
  }

  //#endregion

  //#region Onboarding Step

  getOnboardingStep(): number {
    const onboarding_step = localStorage.getItem(STORAGE_KEYS.ONBOARDING_STEP);

    if (onboarding_step === null) {
      return 0;
    }

    return parseInt(onboarding_step);
  }

  setOnboardingStep(onboardingStep:number)
  {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_STEP,onboardingStep.toString());
  }

  //#endregion

  //#region ClearOnboardingTour
  finishTourAndCleanStorage():void {
    localStorage.removeItem(STORAGE_KEYS.ONBOARDING_STEP);
    localStorage.removeItem(STORAGE_KEYS.ONBOARDING_TOUR_DATA);
    localStorage.removeItem(STORAGE_KEYS.ONBOARDING_TOUR_DATAMODE);
    localStorage.removeItem(STORAGE_KEYS.ONBOARDING_RUNNING);
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_TOUR_PENDING, 'false');
  }
  //#endregion
}
