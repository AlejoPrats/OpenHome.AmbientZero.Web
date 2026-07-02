import { Type } from "@angular/core";

export interface OnboardingStep {
  element: string;
  title: string;
  description: string;
  component?: Type<any>;
  data?: any;
  position?: 'left' | 'right' | 'top' | 'bottom';
  padding?: number;
}