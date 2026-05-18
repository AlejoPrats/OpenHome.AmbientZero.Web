import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrl: './loading-indicator.component.less',
})
export class LoadingIndicatorComponent {
  readonly loadingService = inject(LoadingService);
}
