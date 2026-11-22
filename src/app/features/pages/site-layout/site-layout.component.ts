import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { TuiItem } from '@taiga-ui/cdk';
import { TuiButton, TuiIcon, TuiLink } from '@taiga-ui/core';
import { TuiAvatar, TuiBadgeNotification, TuiBreadcrumbs, TuiFade, TuiTabs } from '@taiga-ui/kit';
import { TuiNavigation } from '@taiga-ui/layout';
import { provideTranslocoScope, TranslocoModule } from '@jsverse/transloco';
import { filter, map } from 'rxjs';
import { ThemeService } from '../../../core/services/theme.service';
import { BreadcrumbService } from '../../../core/services/breadcrumb.service';
import { AdditionalPageInformationService } from '../../../core/services/additional-page-information.service';
import { ThemeSwitcherComponent } from 'app/core/components/theme-switcher/theme-switcher.component';

interface NavigationLink {
  id: string;
  path: string;
  icon: string;
  label: string;
}

type ThemeMode = 'light' | 'dark' | 'auto';
@Component({
  selector: 'app-site-layout',
  imports: [
    TuiAvatar,
    TuiBadgeNotification,
    TuiBreadcrumbs,
    TuiButton,
    TuiFade,
    TuiIcon,
    TuiItem,
    TuiLink,
    TuiNavigation,
    TuiTabs,
    RouterLink,
    RouterOutlet,
    TranslocoModule,
    ThemeSwitcherComponent,
  ],
  providers: [provideTranslocoScope({ scope: 'pages/site-layout', alias: 'siteLayout' })],
  templateUrl: './site-layout.component.html',
  styleUrl: './site-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class SiteLayoutComponent {
  private readonly router = inject(Router);
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly additionalPageInformationService = inject(AdditionalPageInformationService);
  private readonly navigationEnd = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
  );
  private readonly currentUrl = toSignal(this.navigationEnd.pipe(map(() => this.router.url)), {
    initialValue: this.router.url,
  });

  protected readonly theme = inject(ThemeService);
  protected readonly expanded = signal(false);
  protected readonly isMenuOpen = signal(false);
  protected readonly breadcrumbs = computed(() => this.breadcrumbService.getBreadcrumbs());
  protected readonly additionalInformation = computed(() =>
    this.additionalPageInformationService.getAdditionalInformation(),
  );
  protected readonly themeModes: ThemeMode[] = ['light', 'auto', 'dark'];
  protected readonly links: NavigationLink[] = [
    {
      id: 'nav-temperature-chart',
      path: '/chart',
      icon: '@tui.chart-no-axes-column-increasing',
      label: 'siteLayout.temperature-chart',
    },
    { id: 'nav-sensors', path: '/list', icon: '@tui.gauge', label: 'siteLayout.sensors' },
    {
      id: 'nav-basic-settings',
      path: '/settings',
      icon: '@tui.cog',
      label: 'siteLayout.basic-settings',
    },
    {
      id: 'nav-advanced-settings',
      path: '/advancedSettings',
      icon: '@tui.sliders',
      label: 'siteLayout.advanced-settings',
    },
  ];

  constructor() {
    this.navigationEnd.pipe(takeUntilDestroyed()).subscribe(() => this.closeMenu());
  }

  protected isCurrent(path: string, exact = false): boolean {
    const url = this.currentUrl().split(/[?#]/)[0];
    return exact ? url === path : url === path || url.startsWith(`${path}/`);
  }

  protected toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
    this.expanded.set(false);
  }

  protected toggleExpanded(): void {
    this.expanded.update((isExpanded) => !isExpanded);
  }

  protected selectTheme(mode: ThemeMode): void {
    this.theme.set(mode);
  }
}
