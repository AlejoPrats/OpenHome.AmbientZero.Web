import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiDropdownMobile } from '@taiga-ui/addon-mobile';
import {
  TuiButton,
  TuiDropdown,
  TuiInput,
  TuiNotificationService,
  TuiTextfieldComponent,
} from '@taiga-ui/core';
import { TuiComboBox, TuiDataListWrapper } from '@taiga-ui/kit';
import { AccessPointSettingsResponse } from '../../../../../shared/interfaces/access-point-settings-response';
import { PasswordStrengthComponent } from '../../../../../shared/components/password-strength/password-strength.component';
import { AdvancedSettingsService } from 'app/shared/services/advanced-settings.service';
import { NetworkUpdateRequest } from 'app/shared/models/network-update-request';

@Component({
  selector: 'app-network-settings',
  imports: [
    FormsModule,
    TuiButton,
    TuiInput,
    TuiTextfieldComponent,
    TuiDataListWrapper,
    TuiDropdown,
    TuiDropdownMobile,
    TuiComboBox,
    PasswordStrengthComponent,
  ],
  templateUrl: './network-settings.component.html',
  styleUrl: './network-settings.component.less',
})
export class NetworkSettingsComponent implements OnInit {
  protected selectedSecurity = signal<string>('');
  protected ApSecurityList = ['Open', 'Password Protected(WPA2-TKIP)'];
  protected data = input.required<AccessPointSettingsResponse>();
  private advancedSettingsService = inject(AdvancedSettingsService);
  private readonly notificationService = inject(TuiNotificationService);

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
    this.selectedSecurity.set(this.ApSecurityList[this.data().accessPointSecurity]);
  }

  protected saveNetworkSettings() {
    const networkSettingsRequest = new NetworkUpdateRequest(
      this.data().accessPointName,
      this.data().accessPointPassword,
      6,
      'GB',
      this.data().accessPointSecurity,
    );
    this.advancedSettingsService.updateNetowrkSettings(networkSettingsRequest).subscribe({
      next: () => {
        this.notificationService
          .open('Network Settings Saved Succesfully', {
            label: 'Notification',
            appearance: 'positive',
            block: 'end',
            inline: 'end',
            autoClose: 5000,
          })
          .subscribe();
      },
      error: () => {
        this.notificationService
          .open('Failed To Save Network Settings', {
            label: 'Error',
            appearance: 'negative',
            block: 'end',
            inline: 'end',
            autoClose: 5000,
          })
          .subscribe();
      },
    });
  }
}
