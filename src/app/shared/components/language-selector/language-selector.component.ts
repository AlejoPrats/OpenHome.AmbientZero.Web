import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { tuiScrollbarOptionsProvider } from '@taiga-ui/core/components/scrollbar';
import { TuiCountryIsoCode, TuiLanguageName } from '@taiga-ui/i18n';
import { TuiChevron, TuiDataListWrapper, TuiFlagPipe, TuiSelect } from '@taiga-ui/kit';
import { LanguageInterface } from './language-interface';
import { ThemeService } from 'app/core/services/theme.service';

@Component({
  selector: 'app-language-selector',
  imports: [FormsModule, TuiChevron, TuiDataListWrapper, TuiSelect, TuiFlagPipe],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [tuiScrollbarOptionsProvider({ mode: 'hover' })],
})
export class LanguageSelectorComponent {
  protected theme = inject(ThemeService);
  protected value: string = '';

  public readonly languages: LanguageInterface[] = [
    { name: 'english', countryIsoCode: 'GB' },
    { name: 'spanish', countryIsoCode: 'ES' }
  ];

  capitalize(value: string): string {
    if(value !== undefined)
    {
      return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
    }

    return value;
  }
}


