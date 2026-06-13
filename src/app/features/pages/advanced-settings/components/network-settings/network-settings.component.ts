import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiDropdownMobile } from '@taiga-ui/addon-mobile';
import { TuiButton, TuiDropdown, TuiInput, TuiTextfieldComponent } from "@taiga-ui/core";
import { TuiComboBox, TuiDataListWrapper } from '@taiga-ui/kit';
import { AccessPointSettingsResponse } from '../../../../../shared/interfaces/access-point-settings-response';

@Component({
  selector: 'app-network-settings',
  imports: [FormsModule,
    TuiButton,
    TuiInput,
    TuiTextfieldComponent,
    TuiDataListWrapper,
    TuiDropdown,
    TuiDropdownMobile,
    TuiComboBox],
  templateUrl: './network-settings.component.html',
  styleUrl: './network-settings.component.less',
})
export class NetworkSettingsComponent {
  protected disableStartTime: string = '';
  protected country = null;
  protected ApSecurityList = ['Open', 'Password Protected(WPA2-TKIP)']
  protected data = input.required<AccessPointSettingsResponse>();
}
