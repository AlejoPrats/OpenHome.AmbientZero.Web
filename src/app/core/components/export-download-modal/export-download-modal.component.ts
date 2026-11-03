import { Component, inject, signal, OnDestroy } from '@angular/core';
import { TuiButton, TuiDialogContext } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { BROADCAST_CHANNEL } from 'app/core/constants/broadcast-channel.constants';
import { DownloadService } from 'app/core/services/download.service';
import { LoadingService } from 'app/core/services/loading.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { BackupService } from 'app/shared/services/backup.service';

@Component({
  selector: 'app-export-download-modal',
  imports: [TuiButton],
  templateUrl: './export-download-modal.component.html',
  styleUrl: './export-download-modal.component.less',
})
export class ExportDownloadModalComponent implements OnDestroy {
  protected readonly context = injectContext<TuiDialogContext<string, string>>();
  private readonly backupService = inject(BackupService);
  private readonly loadingService = inject(LoadingService);
  private readonly downlaodService = inject(DownloadService);
  private readonly localStorageService = inject(LocalStorageService);
  private channel = new BroadcastChannel(BROADCAST_CHANNEL.LONG_LOADING_CHANNEL);

  protected isProcessRunning = signal<boolean>(false);
  protected backupExists = this.localStorageService.getBackupExists();

  constructor() {
    this.channel.onmessage = (event) => {
      if (event.data === 'success') {
        this.backupExists = this.localStorageService.getBackupExists();
      }
    };
  }

  ngOnDestroy() {
    this.channel.close();
  }

  generateBackup() {
    this.isProcessRunning.set(true);
    this.loadingService.loadingOn();
    this.loadingService.longLoadingOn();
    this.backupService.generateBackup().subscribe();
  }

  downloadBackup() {
    this.backupService.downloadBackup().subscribe({
      next: (response) => {
        this.downlaodService.downloadFromResponse(response);
      },
    });
  }
}
