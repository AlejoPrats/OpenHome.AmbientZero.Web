import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { TuiItem } from '@taiga-ui/cdk';
import { TuiButton, TuiDropdown, TuiIcon, TuiLink } from '@taiga-ui/core';
import { TuiAvatar, TuiBadgeNotification, TuiBreadcrumbs, TuiFade } from '@taiga-ui/kit';
import { TuiNavigation } from '@taiga-ui/layout';
import { provideTranslocoScope, TranslocoModule } from '@jsverse/transloco';
import { filter, map } from 'rxjs';
import { BreadcrumbService } from '../../../core/services/breadcrumb.service';
import { AdditionalPageInformationService } from '../../../core/services/additional-page-information.service';
import { ThemeSwitcherComponent } from 'app/core/components/theme-switcher/theme-switcher.component';
import { ThemeService } from 'app/core/services/theme.service';
import { LanguageSelectorComponent } from 'app/shared/components/language-selector/language-selector.component';
import { AuthService } from 'app/shared/services/auth.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { LoginModalComponent } from 'app/core/components/login-modal/login-modal.component';
import { LoginService } from 'app/core/services/login.service';
import { NotificationService } from 'app/core/services/notification-service.service';

interface NavigationLink {
  id: string;
  path: string;
  icon: string;
  label: string;
}

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
    TuiDropdown,
    TuiNavigation,
    RouterLink,
    RouterOutlet,
    TranslocoModule,
    ThemeSwitcherComponent,
    LanguageSelectorComponent
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
  private readonly localStorageService = inject(LocalStorageService);
  private readonly loginService = inject(LoginService);
  private readonly notificationService = inject(NotificationService);
  private readonly additionalPageInformationService = inject(AdditionalPageInformationService);
  private readonly navigationEnd = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
  );
  private readonly currentUrl = toSignal(this.navigationEnd.pipe(map(() => this.router.url)), {
    initialValue: this.router.url,
  });

  protected isUserMenuOpen = false;
  protected isNotitificationsOpen = false;
  protected readonly theme = inject(ThemeService);
  protected readonly authService = inject(AuthService);
  protected readonly expanded = signal(false);
  protected readonly isMenuOpen = signal(false);
  protected readonly breadcrumbs = computed(() => this.breadcrumbService.getBreadcrumbs());
  protected readonly additionalInformation = computed(() =>
    this.additionalPageInformationService.getAdditionalInformation(),
  );
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

  protected manageCredentials() {
    if (this.authService.isLoggedIn()) {
      this.localStorageService.removeAuthenticationToken();
      this.notificationService
        .Message('Logged out sucessfuly', 'Success')
        .SuccessType()
        .BottomRight()
        .Show();
    }
    else {
      this.loginService.openLoginModal();
    }
  }
}
