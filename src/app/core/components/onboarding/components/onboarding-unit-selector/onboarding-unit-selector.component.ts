import { Component, inject, signal } from '@angular/core';
import { OnboardingService } from '../../services/driver.service';
import { UnitSelectorComponent } from 'app/shared/components/unit-selector/unit-selector.component';
import { ThemeService } from 'app/core/services/theme.service';
import { TuiNotificationService } from '@taiga-ui/core';
import { OnboardingSetupService } from 'app/shared/services/onboarding-setup.service';
import { translate } from '@jsverse/transloco';
import { take } from 'rxjs';

@Component({
  selector: 'app-onboarding-unit-selector',
  imports: [UnitSelectorComponent],
  templateUrl: './onboarding-unit-selector.component.html',
  styleUrl: './onboarding-unit-selector.component.less',
})
export class OnboardingUnitSelectorComponent {
  protected theme = inject(ThemeService);
  onboardingSetupService = inject(OnboardingSetupService);
  private onboardService = inject(OnboardingService);
  private readonly notificationService = inject(TuiNotificationService);
  protected buttonDisabled = signal(true);
  private selectedUnit: number | undefined;

  next() {
    this.onboardingSetupService.setTemperatureUnit(this.selectedUnit!.toString()).pipe(take(1)).subscribe({
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

  unitSelectorChanged(value: number | undefined) {
    if (value) {
      this.selectedUnit = value;
      this.buttonDisabled.set(false);
    }
    else {
      this.buttonDisabled.set(true);
    }
  }
}
