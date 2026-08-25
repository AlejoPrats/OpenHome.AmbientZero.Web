import { TuiRoot } from '@taiga-ui/core';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { LoadingIndicatorComponent } from "./shared/components/loading-indicator/loading-indicator.component";
import { LocalStorageService } from './core/services/local-storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, LoadingIndicatorComponent],
  templateUrl: './app.html',
  styleUrl: './app.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('OpenHome.AmbientZero.Web');
  private readonly localStorageService = inject(LocalStorageService);
  readonly theme = inject(ThemeService);


  ngOnInit() {
    window.addEventListener('beforeunload', () => {
      this.localStorageService.setOnboardingRunning(false);
    });
  }

  ngOnDestroy() {
    window.removeEventListener('beforeunload', () => {
      this.localStorageService.setOnboardingRunning(false);
    });
  }

}
