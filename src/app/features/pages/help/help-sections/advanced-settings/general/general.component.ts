import { Component } from '@angular/core';
import { TuiTitle } from '@taiga-ui/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { IconName } from 'app/shared/components/icon/icon-name.enum';
import { IconComponent } from 'app/shared/components/icon/icon.component';

@Component({
  selector: 'app-general',
  imports: [TuiCardLarge, TuiTitle, TuiHeader, IconComponent],
  templateUrl: './general.component.html',
  styleUrl: './general.component.less',
})
export class GeneralComponent {
  protected iconName = IconName;
}
