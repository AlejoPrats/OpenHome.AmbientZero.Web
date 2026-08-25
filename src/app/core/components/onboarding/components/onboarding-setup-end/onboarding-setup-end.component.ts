import { Component, inject } from '@angular/core';
import { OnboardingService } from '../../services/driver.service';
import { OnboardingSetupService } from 'app/shared/services/onboarding-setup.service';
import { translate, TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { take } from 'rxjs';
import { TuiNotificationService } from '@taiga-ui/core';
import { LocalStorageService } from 'app/core/services/local-storage.service';

@Component({
  selector: 'app-onboarding-setup-end',
  imports: [TranslocoModule],
  templateUrl: './onboarding-setup-end.component.html',
  styleUrl: './onboarding-setup-end.component.less',
})
export class OnboardingSetupEndComponent {
  private onboardService = inject(OnboardingService);
  private onboardingSetupService = inject(OnboardingSetupService);
  private localStorageService = inject(LocalStorageService);
  private readonly notificationService = inject(TuiNotificationService);

  next() {
    this.onboardingSetupService.finishOnboardingSetup().pipe(take(1)).subscribe({
      next: () => {
        this.notificationService.open(translate('language.language-saved'), { label: translate('language.success'), appearance: 'positive', block: 'end', inline: 'end', autoClose: 5000 }).subscribe();
        this.localStorageService.setOnboardingSetupStatus(false);
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
