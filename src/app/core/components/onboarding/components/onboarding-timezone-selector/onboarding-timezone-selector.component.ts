import { Component, inject } from '@angular/core';
import { OnboardingService } from '../../services/driver.service';

@Component({
  selector: 'app-onboarding-timezone-selector',
  imports: [],
  templateUrl: './onboarding-timezone-selector.component.html',
  styleUrl: './onboarding-timezone-selector.component.less',
})
export class OnboardingTimezoneSelectorComponent {
  onboardService = inject(OnboardingService);

  next() {
    this.onboardService.nextStep();
  }

  previous() {
    this.onboardService.previousStep();
  }
}
