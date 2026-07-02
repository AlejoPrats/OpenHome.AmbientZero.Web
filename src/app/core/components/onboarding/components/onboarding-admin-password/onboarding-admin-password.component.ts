import { Component, inject, signal } from '@angular/core';
import { OnboardingService } from '../../services/driver.service';
import { FormsModule } from '@angular/forms';
import { TuiIcon, TuiInput } from '@taiga-ui/core';
import { TuiPassword } from '@taiga-ui/kit';
import { PasswordStrengthComponent } from "app/shared/components/password-strength/password-strength.component";

@Component({
  selector: 'app-onboarding-admin-password',
  imports: [FormsModule, TuiIcon, TuiInput, TuiPassword, PasswordStrengthComponent],
  templateUrl: './onboarding-admin-password.component.html',
  styleUrl: './onboarding-admin-password.component.less',
})
export class OnboardingAdminPasswordComponent {
  onboardService = inject(OnboardingService);
  value:string = '';

  next() {
    this.onboardService.nextStep();
  }

  previous() {
    this.onboardService.previousStep();
  }
}
