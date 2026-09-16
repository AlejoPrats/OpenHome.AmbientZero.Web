import { Component, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiDropdownMobile } from '@taiga-ui/addon-mobile';
import { TuiButton, TuiDropdown, TuiIcon, TuiInput, TuiTextfieldComponent } from '@taiga-ui/core';
import { TuiComboBox, TuiDataListWrapper, TuiCopyDirective, TuiPassword } from '@taiga-ui/kit';
import { SecuritySettingsResponse } from 'app/shared/interfaces/security-settings-response';

@Component({
  selector: 'app-security-settings',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiButton,
    TuiInput,
    TuiTextfieldComponent,
    TuiDataListWrapper,
    TuiDropdown,
    TuiDropdownMobile,
    TuiComboBox,
    TuiCopyDirective,
    TuiPassword,
    TuiIcon,
  ],
  templateUrl: './security-settings.component.html',
  styleUrl: './security-settings.component.less',
})
export class SecuritySettingsComponent {
  protected data = input.required<SecuritySettingsResponse>();
  protected ApSecurityList = ['Open', 'Settings', 'All'];
  protected test = '';
}
