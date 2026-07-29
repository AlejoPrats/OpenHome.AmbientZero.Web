import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { TuiButton, TuiDataList, TuiDropdown, TuiIcon, TuiInput, TuiLink } from '@taiga-ui/core';
import { TuiAvatar, TuiBadgeNotification, TuiBreadcrumbs, TuiFade, TuiTabs } from '@taiga-ui/kit';
import { TuiNavigation } from '@taiga-ui/layout';
import { ThemeService } from '../../../core/services/theme.service';
import { LoadingIndicatorComponent } from '../../../shared/components/loading-indicator/loading-indicator.component';
import { BreadcrumbService } from '../../../core/services/breadcrumb.service';
import { AdditionalPageInformationService } from '../../../core/services/additional-page-information.service';

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
  ],
  templateUrl: './site-layout.component.html',
  styleUrl: './site-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteLayoutComponent {
  protected readonly expanded = signal(false);
  protected readonly breadcrumbService = inject(BreadcrumbService);
  protected readonly additionalPageInformationService = inject(AdditionalPageInformationService);
  protected open = false;
  protected switch = false;
  protected readonly routes: Record<string, unknown> = {};
  protected breadcrumbs = computed(() => this.breadcrumbService.getBreadcrumbs());
  protected additionalInformation = computed(() => this.additionalPageInformationService.getAdditionalInformation());

  readonly theme = inject(ThemeService);
  readonly modes: ThemeMode[] = ['light', 'auto', 'dark'];

  select(index: number) {
    this.theme.set(this.modes[index]);
  }

  protected handleToggle(): void {
    this.expanded.update((e) => !e);
  }
}
