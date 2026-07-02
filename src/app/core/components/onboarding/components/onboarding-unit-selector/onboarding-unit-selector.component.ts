import { Component, inject } from '@angular/core';
import { OnboardingService } from '../../services/driver.service';

@Component({
  selector: 'app-onboarding-unit-selector',
  imports: [],
  templateUrl: './onboarding-unit-selector.component.html',
  styleUrl: './onboarding-unit-selector.component.less',
})
export class OnboardingUnitSelectorComponent {
  onboardService = inject(OnboardingService);

  next() {
    this.onboardService.nextStep();
  }

  previous() {
    this.onboardService.previousStep();
  }
}
