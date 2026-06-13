import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiInput, TuiTextfieldComponent } from '@taiga-ui/core';
import { TuiInputNumber, TuiSwitch } from '@taiga-ui/kit';
import { GeneralSettingsResponse } from '../../../../../shared/interfaces/general-settings-response';

@Component({
  selector: 'app-general-settings',
  imports: [FormsModule, TuiButton, TuiSwitch, TuiTextfieldComponent, TuiInput, TuiInputNumber],
  templateUrl: './general-settings.component.html',
  styleUrl: './general-settings.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralSettingsComponent {
  protected data = input.required<GeneralSettingsResponse>();

}
