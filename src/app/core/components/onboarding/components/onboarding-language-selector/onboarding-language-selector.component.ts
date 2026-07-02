import { Component, inject } from '@angular/core';
import { type TuiCountryIsoCode } from '@taiga-ui/i18n';
import { TUI_COUNTRIES, TuiFlagPipe } from '@taiga-ui/kit';
import { OnboardingService } from '../../services/driver.service';
import { LanguageSelectorComponent } from "app/shared/components/language-selector/language-selector.component";
import { ThemeService } from 'app/core/services/theme.service';

@Component({
  selector: 'app-onboarding-language-selector',
  imports: [LanguageSelectorComponent],
  templateUrl: './onboarding-language-selector.component.html',
  styleUrl: './onboarding-language-selector.component.less',
})
export class OnboardingLanguageSelectorComponent { 
      onboardService = inject(OnboardingService);
      theme = inject(ThemeService);

      next(){
        this.onboardService.nextStep();
      }

      previous(){
        this.onboardService.previousStep();
      }
}
