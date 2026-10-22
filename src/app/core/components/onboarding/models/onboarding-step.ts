/* eslint-disable @typescript-eslint/no-explicit-any */

import { Type } from '@angular/core';

export interface OnboardingStep {
  element?: string;
  title: string;
  description?: string;
  component?: Type<any>;
  shouldClick?: boolean;
  canInteract?: boolean;
  data?: object;
  navigateTo?: string;
  position?: 'left' | 'right' | 'top' | 'bottom';
  padding?: number;
}
