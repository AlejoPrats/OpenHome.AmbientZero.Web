import { Component, ChangeDetectionStrategy, input, computed, output } from '@angular/core';

import { TuiIcon, TuiHintDirective } from '@taiga-ui/core';
import { TuiTooltip } from '@taiga-ui/kit';

import { IconName } from './icon-name.enum';
import { mapIconName } from './icon-mapper';

@Component({
  selector: 'app-icon',
  imports: [TuiIcon, TuiHintDirective, TuiTooltip],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly color = input<string>('#000000');
  readonly size = input<'small' | 'medium' | 'large'>('medium');
  readonly href = input<string>();
  readonly target = input<'_self' | '_blank'>('_self');
  readonly tooltipText = input<string>();
  readonly tooltipDirection = input<'bottom' | 'start' | 'end' | 'top'>('top');
  readonly tooltipAppearance = input<string>('dark');
  readonly appearance = input<string>('');
  readonly showTooltip = input<boolean>(false);
  readonly OnClick = output();

  protected readonly iconName = computed(() => mapIconName(this.name()));
  protected readonly iconClasses = computed(() => {
    const classes: string[] = [this.size()];

    if (this.href()) {
      classes.push('pointer');
    }

    return classes.join(' ');
  });

  protected onIconClick(): void {
    const url = this.href();
    if (url) {
      window.open(url, this.target());
    } else {
      this.OnClick.emit();
    }
  }
}
