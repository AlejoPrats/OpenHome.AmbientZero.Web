import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';
import { TuiProgress } from '@taiga-ui/kit';
import { TuiButton } from '@taiga-ui/core';
import { DurationPipe } from 'app/core/pipes/duration.pipe';
import { CounterService } from 'app/core/services/counter.service';
import { LoadingProgressManager } from 'app/core/managers/loading-progress.manager';
import { provideTranslocoScope, TranslocoModule } from '@jsverse/transloco';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { BROADCAST_CHANNEL } from 'app/core/constants/broadcast-channel.constants';

@Component({
  selector: 'app-loading-indicator',
  imports: [TuiProgress, TuiButton, DurationPipe, TranslocoModule],
  providers: [
    provideTranslocoScope({ scope: 'components/loading-indicator', alias: 'loading-indicator' }),
  ],
  templateUrl: './loading-indicator.component.html',
  styleUrl: './loading-indicator.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingIndicatorComponent {
  private progressManager = inject(LoadingProgressManager);
  private counterService = inject(CounterService);
  private localStorageService = inject(LocalStorageService);
  private channel = new BroadcastChannel(BROADCAST_CHANNEL.LONG_LOADING_CHANNEL);

  protected loadingService = inject(LoadingService);
  protected pipelineRunner = this.progressManager.pipeline;

  protected progress = computed(() => this.progressManager.progress());
  protected progressMessages = computed(() => this.progressManager.progressMessages());
  protected elapsedTime = computed(() => this.counterService.count());

  closeLongLoading() {
    this.localStorageService.setBackupExists(true);
    this.channel.postMessage('success');
    this.channel.close();
    this.loadingService.loadingOff();
    this.loadingService.longLoadingOff();
  }
}
