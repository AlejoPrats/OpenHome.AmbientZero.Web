import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { TuiButton, TuiDataList, TuiDropdown, TuiIcon, TuiInput, TuiLink } from '@taiga-ui/core';
import { TuiAvatar, TuiBadgeNotification, TuiBreadcrumbs, TuiFade, TuiTabs } from '@taiga-ui/kit';
import { TuiNavigation } from '@taiga-ui/layout';
import { ThemeService } from '../../../shared/services/theme.service';
import { LoadingIndicatorComponent } from '../../../shared/components/loading-indicator/loading-indicator.component';

type ThemeMode = 'light' | 'dark' | 'auto';
@Component({
  selector: 'app-site-layout',
  imports: [
    FormsModule,
    TuiAvatar,
    RouterLink,
    TuiBadgeNotification,
    TuiBreadcrumbs,
    TuiButton,
    TuiDataList,
    TuiDropdown,
    TuiFade,
    TuiIcon,
    TuiInput,
    TuiLink,
    TuiNavigation,
    TuiTabs,
    RouterOutlet,
    RouterLinkWithHref,
    LoadingIndicatorComponent,
  ],
  templateUrl: './site-layout.component.html',
  styleUrl: './site-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteLayoutComponent {
  protected readonly expanded = signal(false);
  protected open = false;
  protected switch = false;
  protected readonly routes: Record<string, unknown> = {};
  protected readonly breadcrumbs = ['Home', 'Angular', 'Repositories', 'Taiga UI'];

  readonly theme = inject(ThemeService);
  readonly modes: ThemeMode[] = ['light', 'auto', 'dark'];

  select(index: number) {
    this.theme.set(this.modes[index]);
  }

  protected handleToggle(): void {
    this.expanded.update((e) => !e);
  }
}
