import { Component, inject, signal } from '@angular/core';
import { OnboardingService } from '../../services/driver.service';
import { PasswordChangeComponent } from "app/shared/components/password-change/password-change.component";
import { PasswordChangeResult } from 'app/shared/components/password-change/password-change-result';
import { OnboardingSetupService } from 'app/shared/services/onboarding-setup.service';
import { TuiNotificationService } from '@taiga-ui/core';
import { translate } from '@jsverse/transloco';
import { take } from 'rxjs';

@Component({
  selector: 'app-onboarding-admin-password',
  imports: [PasswordChangeComponent],
  templateUrl: './onboarding-admin-password.component.html',
  styleUrl: './onboarding-admin-password.component.less',
})
export class OnboardingAdminPasswordComponent {
  onboardService = inject(OnboardingService);
  onboardingSetupService = inject(OnboardingSetupService);
  private readonly notificationService = inject(TuiNotificationService);
  protected buttonDisabled = signal(true);
  value: string = '';

  passwordValidation(result: PasswordChangeResult) {
    if (result.isValid) {
      this.value = result.password;
      this.buttonDisabled.set(false);
    }
    else {
      this.buttonDisabled.set(true);
    }
  }

  next() {
    this.onboardingSetupService.setAdminPassword(this.value!).pipe(take(1)).subscribe({
      next: () => {
        this.notificationService.open(translate('language.language-saved'), { label: translate('language.success'), appearance: 'positive', block: 'end', inline: 'end', autoClose: 5000 }).subscribe();
        this.onboardService.nextStep();
      },
      error: () => {
        this.notificationService.open(translate('language.language-not-saved'), { label: translate('language.error'), appearance: 'negative', block: 'end', inline: 'end', autoClose: 5000 }).subscribe();
      }
    });
  }

  previous() {
    this.onboardService.previousStep();
  }
}
