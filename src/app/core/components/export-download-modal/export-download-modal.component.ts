import { Component, inject, signal } from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { DownloadService } from 'app/core/services/download.service';
import { LoadingService } from 'app/core/services/loading.service';
import { BackupService } from 'app/shared/services/backup.service';

@Component({
  selector: 'app-export-download-modal',
  imports: [],
  templateUrl: './export-download-modal.component.html',
  styleUrl: './export-download-modal.component.less',
})
export class ExportDownloadModalComponent {
  protected readonly context = injectContext<TuiDialogContext<void, string>>();
  private readonly backupService = inject(BackupService);
  private readonly loadingService = inject(LoadingService);
  private readonly downlaodService = inject(DownloadService);
  protected isProcessRunning = signal<boolean>(false);
  protected lastBackupDate = this.context.data ?? undefined;

  generateBackup() {
    this.isProcessRunning.set(true);
    this.backupService.generateBackup().subscribe({
      next: () => {
        this.loadingService.loadingOn();
        this.loadingService.longLoadingOn();
      },
      complete: () => {
        this.isProcessRunning.set(false);
      },
    });
  }

  downloadBackup() {
    this.backupService.downloadBackup().subscribe({
      next: (response) => {
        this.downlaodService.downloadFromResponse(response);
      },
    });
  }
}
