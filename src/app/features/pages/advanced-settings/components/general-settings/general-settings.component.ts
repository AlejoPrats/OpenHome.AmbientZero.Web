import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  TuiButton,
  TuiInput,
  TuiTextfieldComponent,
  TuiHintDirective,
  TuiNotificationService,
  TuiIcon,
} from '@taiga-ui/core';
import { TuiInputNumber, TuiSwitch } from '@taiga-ui/kit';
import { GeneralSettingsResponse } from '../../../../../shared/interfaces/general-settings-response';
import { VersionService } from '../../../../../shared/services/version.service';
import { VersionResponse } from '../../../../../shared/interfaces/version-response';
import { DatePipe } from '@angular/common';
import { AdvancedSettingsService } from '../../../../../shared/services/advanced-settings.service';
import { TuiResponsiveDialogService } from '@taiga-ui/addon-mobile';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { ForceUpdateModalComponent } from 'app/core/components/force-update-modal/force-update-modal.component';
import { ModuleUpdateRequest } from 'app/shared/models/module-update-request';
import { TimedAutoRefreshModalComponent } from 'app/core/components/timed-auto-refresh-modal/timed-auto-refresh-modal.component';

@Component({
  selector: 'app-general-settings',
  imports: [
    FormsModule,
    TuiButton,
    TuiSwitch,
    TuiTextfieldComponent,
    TuiInput,
    TuiInputNumber,
    TuiHintDirective,
    DatePipe,
    TuiIcon,
  ],
  templateUrl: './general-settings.component.html',
  styleUrl: './general-settings.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralSettingsComponent {
  protected data = input.required<GeneralSettingsResponse>();
  protected versionList = signal<VersionResponse[] | null>(null);
  protected isForceUpdateEnabled: boolean = false;
  private readonly versionService = inject(VersionService);
  private readonly dialog = inject(TuiResponsiveDialogService);
  private readonly advancedSettingsService = inject(AdvancedSettingsService);
  private readonly notificationService = inject(TuiNotificationService);
  showUpdateColumn = computed(() => {
    return this.versionList()?.some((v) => v.remoteVersion > v.localVersion) ?? false;
  });

  constructor() {
    this.getVersions();
  }

  private getVersions() {
    this.versionService.getVersions().subscribe({
      next: (result) => {
        this.versionList.set(result);
      },
    });
  }

  protected updateVersion() {
    this.versionService.updateVersions().subscribe({
      next: (result) => {
        this.versionList.set(result);
      },
    });
  }

  protected saveGeneralSettings() {
    this.advancedSettingsService.updateGeneralSettings(this.data()).subscribe({
      next: () => {
        this.showNotification('General Settings Saved Succesfully', 'positive', 'Notification');
      },
    });
  }

  private parseVersion(v: string): number[] {
    return v.split('.').map((n) => Number(n));
  }

  protected isRemoteGreater(local: string, remote: string): boolean {
    if (local && remote) {
      const l = this.parseVersion(local);
      const r = this.parseVersion(remote);

      const len = Math.max(l.length, r.length);

      for (let i = 0; i < len; i++) {
        const lv = l[i] ?? 0;
        const rv = r[i] ?? 0;

        if (rv > lv) return true;
        if (rv < lv) return false;
      }
    }

    return false;
  }

  protected toggleForceUpdate() {
    this.isForceUpdateEnabled = !this.isForceUpdateEnabled;
  }

  protected updateModule(moduleId: string) {
    const moduleName = this.versionList()?.filter((version) => version.id === moduleId)[0].name;

    if (this.isForceUpdateEnabled) {
      this.dialog
        .open<ModuleUpdateRequest>(new PolymorpheusComponent(ForceUpdateModalComponent), {
          label: `Force Update ${moduleName}`,
          closable: true,
          dismissible: true,
          size: 'm',
          data: moduleId,
        })
        .subscribe({
          next: (result) => {
            this.versionService.updateModule(result).subscribe({
              next: () => {
                this.showNotification('Module Updated Succesfully', 'positive', 'Notification');
                if (moduleName === 'API') {
                  this.dialog
                    .open(new PolymorpheusComponent(TimedAutoRefreshModalComponent), {
                      closable: false,
                      dismissible: false,
                      size: 'm',
                    })
                    .subscribe();
                } else if (moduleName === 'Web') {
                  location.replace(window.location.href);
                }
              },
              error: () => {
                this.showNotification('Module Failed to Update', 'negative', 'Error');
              },
            });
          },
          error: () => {},
          complete: () => {},
        });
    } else {
      this.versionService
        .updateModule(new ModuleUpdateRequest(moduleId, this.isForceUpdateEnabled, false))
        .subscribe({
          next: () => {
            this.showNotification('Module Updated Succesfully', 'positive', 'Notification');
          },
          error: () => {
            this.showNotification('Module Failed to Update', 'negative', 'Error');
          },
        });
    }
  }

  private showNotification(message: string, appareance: string, label: string) {
    this.notificationService
      .open(message, {
        label: label,
        appearance: appareance,
        block: 'end',
        inline: 'end',
        autoClose: 5000,
      })
      .subscribe();
  }
}
