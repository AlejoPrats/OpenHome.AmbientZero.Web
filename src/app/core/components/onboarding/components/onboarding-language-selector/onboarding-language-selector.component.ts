import { Component, inject, signal } from '@angular/core';
import { OnboardingService } from '../../services/driver.service';
import { LanguageSelectorComponent } from "app/shared/components/language-selector/language-selector.component";
import { ThemeService } from 'app/core/services/theme.service';
import { provideTranslocoScope, translate, TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { OnboardingSetupService } from 'app/shared/services/onboarding-setup.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { TuiNotificationService } from '@taiga-ui/core';
import { take } from 'rxjs';

@Component({
  selector: 'app-onboarding-language-selector',
  providers: [provideTranslocoScope({ scope: 'onboarding/onboarding-language-selector', alias: 'language' })],
  imports: [LanguageSelectorComponent, TranslocoModule],
  templateUrl: './onboarding-language-selector.component.html',
  styleUrl: './onboarding-language-selector.component.less',
})
export class OnboardingLanguageSelectorComponent {
  private onboardService = inject(OnboardingService);
  private onboardingSetupService = inject(OnboardingSetupService);
  private localStorageService = inject(LocalStorageService);
  protected translocoService = inject(TranslocoService);
  protected theme = inject(ThemeService);
  private readonly notificationService = inject(TuiNotificationService);
  protected buttonDisabled = signal(true);
  private selectedLanguage: string | undefined = undefined;

  next() {
    this.onboardingSetupService.setLanguage(this.selectedLanguage!).pipe(take(1)).subscribe({
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

  languageSelectorChanged(value: string | undefined) {
    if (value) {
      this.selectedLanguage = value;
      this.localStorageService.setLanguage(value);
      this.translocoService.setActiveLang(value);
      this.buttonDisabled.set(false);
    }
    else {
      this.buttonDisabled.set(true);
    }
  }
}
