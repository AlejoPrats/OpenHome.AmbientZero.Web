import { TuiRoot } from '@taiga-ui/core';
import { Component,inject,input, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot],
  templateUrl: './app.html',
  styleUrl: './app.less',
})
export class App {
  protected readonly title = signal('OpenHome.AmbientZero.Web');
  readonly theme = inject(ThemeService);
}
