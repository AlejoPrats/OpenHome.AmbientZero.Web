import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NabVarItem } from 'app/shared/components/nav-bar/nab-var-item';
import { NavBarComponent } from 'app/shared/components/nav-bar/nav-bar.component';
import { TUI_FILE_OPTIONS, TuiFiles } from '@taiga-ui/kit';
import { FormsModule } from '@angular/forms';
import { TuiIcon, TuiButton, TuiDialogContext } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { ModuleUpdateRequest } from 'app/shared/models/module-update-request';
import { VersionService } from 'app/shared/services/version.service';
import { NotificationService } from 'app/core/services/notification-service.service';

@Component({
  selector: 'app-force-update-modal',
  imports: [NavBarComponent, FormsModule, TuiIcon, TuiFiles, TuiButton],
  templateUrl: './force-update-modal.component.html',
  styleUrl: './force-update-modal.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(submit.prevent)': 'context.completeWith(response)' },
})
export class ForceUpdateModalComponent {
  protected readonly formatSize = inject(TUI_FILE_OPTIONS).formatSize;
  protected readonly context = injectContext<TuiDialogContext<ModuleUpdateRequest, string>>();
  protected readonly file = signal<File | undefined>(undefined);
  protected readonly uploadedFile: File | undefined = undefined;
  private readonly versionService = inject(VersionService);
  private readonly notificationService = inject(NotificationService);
  protected showFileUpload: boolean = false;
  protected response: ModuleUpdateRequest = new ModuleUpdateRequest(this.context.data, true, false);
  protected displayError: boolean = false;
  protected actualFileExtension: string = '';
  readonly tabs: NabVarItem[] = [
    {
      id: 0,
      selectorId: 'advanced-settings-general-tab',
      label: 'Update From Server',
      icon: '@tui.cog',
      enabled: true,
    },
    {
      id: 1,
      selectorId: 'advanced-settings-network-tab',
      label: 'Update From File',
      icon: '@tui.router',
      enabled: true,
    },
  ];
  private readonly enabledExtensions: string[] = ['zip'];

  onTabChange(i: number) {
    if (i == 0) {
      this.showFileUpload = false;
      this.file.set(undefined);
      this.displayError = false;
      this.response.hasFile = false;
    } else {
      this.showFileUpload = true;
    }
  }

  protected onFileDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer) {
      this.handleUpload(e.dataTransfer.files);
    }
  }

  protected remove(): void {
    this.file.set(undefined);
    this.response.hasFile = false;
  }

  protected onFileSelected(e: Event) {
    this.handleUpload((e.target as HTMLInputElement).files!);
  }

  private handleUpload(files: FileList) {
    if (files.item(0)) {
      this.actualFileExtension = this.getExtension(files.item(0)!.name);
      if (this.actualFileExtension === 'zip') {
        this.versionService.uploadFile(files.item(0)!, this.response.moduleId).subscribe({
          next: () => {
            this.file.set(files.item(0)!);
            this.response.hasFile = true;
            this.displayError = false;
            this.notificationService
              .Message('File Uploaded Sucessfuly', 'Success')
              .DownRight()
              .NotificationType('positive')
              .Show();
          },
          error: () => {
            this.notificationService
              .Message('Failed to upload the file', 'Error')
              .DownRight()
              .NotificationType('negative')
              .Show();
          },
        });
      } else {
        this.displayError = true;
      }
    }
  }

  protected submit() {
    this.context.$implicit.next(this.response);
    this.context.$implicit.complete();
  }

  private getExtension(name: string): string {
    const i = name.lastIndexOf('.');
    if (i <= 0) return '';
    return name.slice(i + 1).toLowerCase();
  }
}
