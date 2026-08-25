import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiDropdownMobile } from '@taiga-ui/addon-mobile';
import { TuiButton, TuiDropdown, TuiInput, TuiTextfieldComponent } from '@taiga-ui/core';
import { TuiComboBox, TuiDataListWrapper } from '@taiga-ui/kit';

@Component({
  selector: 'app-security-settings',
  imports: [FormsModule,
    ReactiveFormsModule,   // <— REQUIRED for Taiga UI controls
    TuiButton,
    TuiInput,
    TuiTextfieldComponent,
    TuiDataListWrapper,
    TuiDropdown,
    TuiDropdownMobile,
    TuiComboBox],
  templateUrl: './security-settings.component.html',
  styleUrl: './security-settings.component.less',
})
export class SecuritySettingsComponent { 
  protected ApSecurityList = ['Open', 'Settings', 'All']
  protected test = ''
}
