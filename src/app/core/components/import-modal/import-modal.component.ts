import { Component, inject, signal } from '@angular/core';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { injectContext } from '@taiga-ui/polymorpheus';
import { TuiButton, TuiDialogContext } from '@taiga-ui/core';
import { LoadingService } from 'app/core/services/loading.service';
import { BackupService } from 'app/shared/services/backup.service';

@Component({
  selector: 'app-import-modal',
  imports: [FileUploadComponent, TuiButton],
  templateUrl: './import-modal.component.html',
  styleUrl: './import-modal.component.less',
})
export class ImportModalComponent {
  protected readonly context = injectContext<TuiDialogContext<string, string>>();
  protected hasFile = signal<boolean>(false);
  private loadingService = inject(LoadingService);
  private backupService = inject(BackupService);

  fileChanged(fileStatus: boolean) {
    this.hasFile.set(fileStatus);
  }

  importBackup() {
    this.loadingService.loadingOn();
    this.loadingService.longLoadingOn();
    this.backupService.importBackup().subscribe();
  }
}
