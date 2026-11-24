import { Component, computed, inject } from '@angular/core';
import { TuiSegmented } from '@taiga-ui/kit';
import { TuiIcon } from '@taiga-ui/core';
import { ThemeOption } from './theme-option';
import { ThemeService } from 'app/core/services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  imports: [TuiSegmented, TuiIcon],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.less',
})
export class ThemeSwitcherComponent {
  readonly theme = inject(ThemeService);
  protected readonly options: readonly ThemeOption[] = [
    { value: 'light', label: 'Light', icon: '@tui.sun' },
    { value: 'auto', label: 'System', icon: '@tui.monitor' },
    { value: 'dark', label: 'Dark', icon: '@tui.moon' },
  ];

  protected readonly activeIndex = computed(() =>
    this.options.findIndex((option) => option.value === this.theme.mode()),
  );

  protected onSelect(index: number): void {
    this.theme.set(this.options[index].value);
  }
}
