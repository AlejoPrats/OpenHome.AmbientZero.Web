import { Component, effect, input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiDropdownMobile } from '@taiga-ui/addon-mobile';
import { TuiButton, TuiDropdown, TuiInput, TuiTextfieldComponent } from "@taiga-ui/core";
import { TuiComboBox, TuiDataListWrapper } from '@taiga-ui/kit';
import { AccessPointSettingsResponse } from '../../../../../shared/interfaces/access-point-settings-response';
import { PasswordStrengthComponent } from "../../../../../shared/components/password-strength/password-strength.component";

@Component({
  selector: 'app-network-settings',
  imports: [FormsModule,
    TuiButton,
    TuiInput,
    TuiTextfieldComponent,
    TuiDataListWrapper,
    TuiDropdown,
    TuiDropdownMobile,
    TuiComboBox, PasswordStrengthComponent],
  templateUrl: './network-settings.component.html',
  styleUrl: './network-settings.component.less',
})
export class NetworkSettingsComponent implements OnInit {
  protected disableStartTime: string = '';
  protected selectedSecurity = signal<string>('');
  protected ApSecurityList = ['Open', 'Password Protected(WPA2-TKIP)']
  protected data = input.required<AccessPointSettingsResponse>();

  constructor() {
    effect(() => {
      const label = this.selectedSecurity();
      const index = this.ApSecurityList.indexOf(label);

      if (index !== -1) {
        if (index == 0) {
          this.data().accessPointPassword = '';
        }

        this.data().accessPointSecurity = index;
      }
    });
  }

  ngOnInit() {
    this.selectedSecurity.set(
      this.ApSecurityList[this.data().accessPointSecurity]
    );
  }

  protected saveNetworkSettings() {
    console.log(this.data());
  }
}
