import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';
import { TuiProgress } from '@taiga-ui/kit';
import { TuiButton } from '@taiga-ui/core';
import { DurationPipe } from 'app/core/pipes/duration.pipe';
import { CounterService } from 'app/core/services/counter.service';
import { LoadingProgressManager } from 'app/core/managers/loading-progress.manager';

@Component({
  selector: 'app-loading-indicator',
  imports: [TuiProgress, TuiButton, DurationPipe],
  templateUrl: './loading-indicator.component.html',
  styleUrl: './loading-indicator.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingIndicatorComponent {
  private progressManager = inject(LoadingProgressManager);
  private counterService = inject(CounterService);

  protected loadingService = inject(LoadingService);
  protected pipelineRunner = this.progressManager.pipeline;

  protected progress = computed(() => this.progressManager.progress());
  protected progressMessages = computed(() => this.progressManager.progressMessages());
  protected elapsedTime = computed(() => this.counterService.count());
}
