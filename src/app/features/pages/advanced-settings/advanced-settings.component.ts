import { Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { TuiTabBar } from '@taiga-ui/addon-mobile';
import { GeneralSettingsComponent } from './components/general-settings/general-settings.component';
import { NetworkSettingsComponent } from './components/network-settings/network-settings.component';
import { SecuritySettingsComponent } from './components/security-settings/security-settings.component';
import { DashboardSettingsComponent } from './components/dashboard-settings/dashboard-settings.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { CommonModule } from '@angular/common';
import { TuiTab } from "@taiga-ui/kit";
import { TuiHint, TuiIcon } from '@taiga-ui/core';
import { NavBarComponent } from "../../../shared/components/nav-bar/nav-bar.component";
import { NabVarItem } from '../../../shared/components/nav-bar/nab-var-item';
import { toSignal } from '@angular/core/rxjs-interop';
import { AdvancedSettingsResponse } from '../../../shared/interfaces/advanced-settings-response';
import { map } from 'rxjs';
import { BreadcrumbService } from '../../../core/services/breadcrumb.service';
import { AdditionalPageInformationService } from '../../../core/services/additional-page-information.service';
import { ScrollIndicatorComponent } from "../../../shared/components/scroll-indicator/scroll-indicator.component";

@Component({
  selector: 'app-advanced-settings',
  imports: [CommonModule, TuiTabBar, TuiHint, NavBarComponent, ScrollIndicatorComponent],
  templateUrl: './advanced-settings.component.html',
  styleUrl: './advanced-settings.component.less',
  encapsulation: ViewEncapsulation.None
})
export class AdvancedSettingsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly breadcrumbService = inject(BreadcrumbService);
  protected readonly additionalPageInformationService = inject(AdditionalPageInformationService);
  index = signal(0);

  protected readonly advancedSettings = toSignal(
    this.route.data.pipe(map(({ advancedSettings }) => advancedSettings as AdvancedSettingsResponse)),
    { initialValue: null },
  );

  ngOnInit() {
    this.breadcrumbService.clearBreadcrumbs();
    this.breadcrumbService.addBreadcrumb("Advanced Settings")
    this.breadcrumbService.addBreadcrumb('General');
    this.additionalPageInformationService.clearAdditionalInformation();
  }

  readonly tabs: NabVarItem[] = [
    { id: 0, selectorId: 'advanced-settings-general-tab', label: 'General', icon: '@tui.cog', enabled: true },
    { id: 1, selectorId: 'advanced-settings-network-tab', label: 'Network', icon: '@tui.router', enabled: true },
    { id: 2, selectorId: 'advanced-settings-security-tab', label: 'Security', icon: '@tui.shield', enabled: true },
    { id: 3, selectorId: 'advanced-settings-users-tab', label: 'Users', icon: '@tui.user', enabled: false, hint: 'Comming Soon' },
    { id: 4, selectorId: 'advanced-settings-dashboard-tab', label: 'Dashboard', icon: '@tui.layout-dashboard', enabled: false, hint: 'Comming Soon' },
  ]

  readonly components = [
    GeneralSettingsComponent,
    NetworkSettingsComponent,
    SecuritySettingsComponent,
    UserSettingsComponent,
    DashboardSettingsComponent
  ];

  currentInputs = computed(() => {
    switch (this.index()) {
      case 0: return { data: this.advancedSettings()?.generalSettings };
      case 1: return { data: this.advancedSettings()?.accessPointSettings };
      case 2: return { data: this.advancedSettings()?.applicationSecurity };
      case 3: return { data: this.advancedSettings()?.generalSettings };
      case 4: return { data: this.advancedSettings()?.generalSettings };
      default: return {};
    }
  });

  currentBreadcrumb() {
    this.breadcrumbService.removeLastBreadcrumb();
    let newBreadcrumb;
    switch (this.index()) {
      case 0: newBreadcrumb = 'General'; break;
      case 1: newBreadcrumb = 'Access Point Settings'; break;
      case 2: newBreadcrumb = 'Application Security'; break;
      case 3: newBreadcrumb = 'Users Management'; break;
      case 4: newBreadcrumb = 'Dashboard Settings'; break;
      default: newBreadcrumb = 'Not Indexed';
    }
    this.breadcrumbService.addBreadcrumb(newBreadcrumb);
  };

  currentComponent = computed(() => this.components[this.index()]);

  onTabChange(i: number) {
    this.index.set(i);
    this.currentBreadcrumb();
  }
}
