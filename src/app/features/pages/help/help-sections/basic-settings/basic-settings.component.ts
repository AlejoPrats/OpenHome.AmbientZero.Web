import { Component } from '@angular/core';
import { TuiTitle } from '@taiga-ui/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { IconName } from 'app/shared/components/icon/icon-name.enum';
import { IconComponent } from 'app/shared/components/icon/icon.component';

@Component({
  selector: 'app-basic-settings',
  imports: [TuiCardLarge, TuiTitle, TuiHeader, IconComponent],
  templateUrl: './basic-settings.component.html',
  styleUrl: './basic-settings.component.less',
})
export class BasicSettingsComponent {
  protected iconName = IconName;
}
