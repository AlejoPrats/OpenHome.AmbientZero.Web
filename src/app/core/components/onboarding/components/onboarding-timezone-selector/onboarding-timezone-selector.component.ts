import { Component, inject, signal } from '@angular/core';
import { OnboardingService } from '../../services/driver.service';
import { TimeZoneSelectorComponent } from "app/shared/components/time-zone-selector/time-zone-selector.component";
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { OnboardingSetupService } from 'app/shared/services/onboarding-setup.service';
import { take } from 'rxjs';
import { TuiNotificationService } from '@taiga-ui/core';
import { translate, TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-onboarding-timezone-selector',
  imports: [TimeZoneSelectorComponent, TranslocoModule],
  templateUrl: './onboarding-timezone-selector.component.html',
  styleUrl: './onboarding-timezone-selector.component.less',
})
export class OnboardingTimezoneSelectorComponent {
  onboardService = inject(OnboardingService);
  onboardingSetupService = inject(OnboardingSetupService);
  private readonly notificationService = inject(TuiNotificationService);
  protected buttonDisabled = signal(true);
  private selectedTimezone: string | undefined;

  next() {
    this.onboardingSetupService.setTimezone(this.selectedTimezone!).pipe(take(1)).subscribe({
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

  timeZoneSelectorChanged(value: string | undefined) {
    console.log(value);
    if (value) {
      this.selectedTimezone = value;
      this.buttonDisabled.set(false);
    }
    else {
      this.buttonDisabled.set(true);
    }
  }
}
