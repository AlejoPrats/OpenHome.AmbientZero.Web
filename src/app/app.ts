import { TuiRoot } from '@taiga-ui/core';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { LoadingIndicatorComponent } from './shared/components/loading-indicator/loading-indicator.component';
import { LocalStorageService } from './core/services/local-storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, LoadingIndicatorComponent],
  templateUrl: './app.html',
  styleUrl: './app.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('OpenHome.AmbientZero.Web');
  private readonly localStorageService = inject(LocalStorageService);
  readonly theme = inject(ThemeService);

  constructor() {
    const stopOnboarding = () => this.localStorageService.setOnboardingRunning(false);
    window.addEventListener('beforeunload', stopOnboarding);
    inject(DestroyRef).onDestroy(() => window.removeEventListener('beforeunload', stopOnboarding));
  }
}
