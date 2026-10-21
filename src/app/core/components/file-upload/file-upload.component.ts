import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiDialogContext, TuiIcon } from '@taiga-ui/core';
import { TUI_FILE_OPTIONS, TuiFiles } from '@taiga-ui/kit';
import { injectContext } from '@taiga-ui/polymorpheus';
import { NotificationService } from 'app/core/services/notification-service.service';
import { ModuleUpdateRequest } from 'app/shared/models/module-update-request';
import { BackupService } from 'app/shared/services/backup.service';
import { VersionService } from 'app/shared/services/version.service';

@Component({
  selector: 'app-file-upload',
  imports: [FormsModule, TuiIcon, TuiFiles],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.less',
  host: { '(submit.prevent)': '$event.preventDefault()' },
})
export class FileUploadComponent {
  protected readonly formatSize = inject(TUI_FILE_OPTIONS).formatSize;
  protected readonly context = injectContext<TuiDialogContext<ModuleUpdateRequest, string>>();
  protected readonly file = signal<File | undefined>(undefined);
  protected readonly uploadedFile: File | undefined = undefined;
  protected showFileUpload: boolean = false;
  private readonly versionService = inject(VersionService);
  private readonly backupService = inject(BackupService);
  private readonly notificationService = inject(NotificationService);
  protected displayError: boolean = false;
  protected actualFileExtension: string = '';
  readonly uploadType = input.required<'ForceUpdate' | 'Import'>();
  readonly acceptedFiles = input.required<string[]>();
  readonly referenceId = input<string>();
  readonly fileChanged = output<boolean>();
  protected errorMessage: string = '';

  reset() {
    this.showFileUpload = false;
    this.file.set(undefined);
    this.displayError = false;
  }

  protected onFileDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer) {
      this.handleUpload(e.dataTransfer.files);
    }
  }

  protected onFileSelected(e: Event) {
    this.handleUpload((e.target as HTMLInputElement).files!);
  }

  protected remove(): void {
    this.file.set(undefined);
    this.fileChanged.emit(false);
  }

  private handleUpload(files: FileList) {
    if (files.item(0)) {
      this.actualFileExtension = this.getExtension(files.item(0)!.name);
      if (this.acceptedFiles().includes(this.actualFileExtension)) {
        let service;
        if (this.uploadType() === 'ForceUpdate') {
          if (this.referenceId()) {
            service = this.versionService.uploadFile(files.item(0)!, this.referenceId()!);
          } else {
            this.errorMessage = 'you must set a referenceId to execute this function';
            this.displayError = true;
          }
        } else if (this.uploadType() === 'Import') {
          service = this.backupService.uploadImportFile(files.item(0)!);
        }

        service!.subscribe({
          next: () => {
            this.file.set(files.item(0)!);
            this.displayError = false;
            this.notificationService
              .Message('File Uploaded Sucessfuly', 'Success')
              .SuccessType()
              .BottomRight()
              .Show();
            this.fileChanged.emit(true);
          },
          error: () => {
            this.notificationService
              .Message('Failed to upload the file', 'Error')
              .ErrorType()
              .BottomRight()
              .Show();
          },
        });
      } else {
        this.errorMessage = `⛔ The file must be a "<i>${this.joinWithOr(this.acceptedFiles(), 'or')}</i>" you tried to upload a "<i>${this.actualFileExtension}</i>" file`;
        this.displayError = true;
      }
    }
  }

  private getExtension(name: string): string {
    const i = name.lastIndexOf('.');
    if (i <= 0) return '';
    return name.slice(i + 1).toLowerCase();
  }

  private joinWithOr(values: string[], orWord: string): string {
    if (values.length === 0) return '';
    if (values.length === 1) return values[0];
    if (values.length === 2) return `${values[0]} ${orWord} ${values[1]}`;

    const allButLast = values.slice(0, -1).join(', ');
    const last = values.at(-1);

    return `${allButLast} ${orWord} ${last}`;
  }
}
