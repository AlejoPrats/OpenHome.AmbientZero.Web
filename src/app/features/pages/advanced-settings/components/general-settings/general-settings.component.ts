import { ChangeDetectionStrategy, Component, inject, input, OnInit, Signal, signal, Version } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiInput, TuiTextfieldComponent, TuiHintDirective, TuiNotificationService } from '@taiga-ui/core';
import { TuiInputNumber, TuiSwitch } from '@taiga-ui/kit';
import { GeneralSettingsResponse } from '../../../../../shared/interfaces/general-settings-response';
import { VersionService } from '../../../../../shared/services/version.service';
import { VersionResponse } from '../../../../../shared/interfaces/version-response';
import { DatePipe } from '@angular/common';
import { AdvancedSettingsService } from '../../../../../shared/services/advanced-settings.service';

@Component({
  selector: 'app-general-settings',
  imports: [FormsModule, TuiButton, TuiSwitch, TuiTextfieldComponent, TuiInput, TuiInputNumber, TuiHintDirective, DatePipe],
  templateUrl: './general-settings.component.html',
  styleUrl: './general-settings.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralSettingsComponent {
  protected data = input.required<GeneralSettingsResponse>();
  protected versionList = signal<VersionResponse[] | null>(null);
  private readonly versionService = inject(VersionService);
  private readonly advancedSettings = inject(AdvancedSettingsService);
  private readonly notificationService = inject(TuiNotificationService);


  constructor() {
    this.getVersions();
  }



  private getVersions() {
    this.versionService.getVersions().subscribe({
      next: (result) => {
        this.versionList.set(result);
        console.log(result);
      }
    });
  }

  protected updateVersion() {
    this.versionService.updateVersions().subscribe({
      next: (result) => {
        this.versionList.set(result);
        console.log(result);
      }
    });
  }

  protected saveGeneralSettings() {
    this.advancedSettings.updateGeneralSettings(this.data()).subscribe({
      next: () => {
        this.notificationService.open('General Settings Saved Succesfully', { label: 'Notification', appearance: 'positive', block: 'end', inline: 'end', autoClose: 5000 }).subscribe();
      }
    });
  }
}
