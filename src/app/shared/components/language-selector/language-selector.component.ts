import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { tuiScrollbarOptionsProvider } from '@taiga-ui/core/components/scrollbar';
import { TuiChevron, TuiDataListWrapper, TuiFlagPipe, TuiSelect } from '@taiga-ui/kit';
import { LanguageInterface } from './language-interface';
import { ThemeService } from 'app/core/services/theme.service';
import { provideTranslocoScope, TranslocoModule, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-language-selector',
  imports: [FormsModule, TuiChevron, TuiDataListWrapper, TuiSelect, TuiFlagPipe, TranslocoModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [tuiScrollbarOptionsProvider({ mode: 'hover' }),
  provideTranslocoScope({ scope: 'components/language-selector', alias: 'languageSelector' })],
})
export class LanguageSelectorComponent {
  protected theme = inject(ThemeService);
  protected value: LanguageInterface | null = null;
  valueChanged = output<string|undefined>();

  public readonly languages: LanguageInterface[] = [
    { name: 'english', countryIsoCode: 'GB', translocoCode: 'en' },
    { name: 'spanish', countryIsoCode: 'ES', translocoCode: 'es' }
  ];

  languageChanged() {
    this.valueChanged.emit(this.value?.translocoCode);
  }

  capitalize(value: string): string {
    if (value !== undefined) {
      return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
    }

    return value;
  }

}


