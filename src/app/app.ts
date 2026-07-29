import { TuiRoot } from '@taiga-ui/core';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { LoadingIndicatorComponent } from "./shared/components/loading-indicator/loading-indicator.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, LoadingIndicatorComponent],
  templateUrl: './app.html',
  styleUrl: './app.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('OpenHome.AmbientZero.Web');
  readonly theme = inject(ThemeService);

}
