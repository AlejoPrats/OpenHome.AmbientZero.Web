import { Routes } from '@angular/router';
import { sensorInfrmationResolver, sensorsResolver } from './shared/resolvers/sensors-resolver';
import { temperatureChartResolver } from './shared/resolvers/temperature-chart-resolver';
import { systemTimeZonesResolver } from './shared/resolvers/system-resolver';
import { applicationSettingsResolver } from './shared/resolvers/settings-resolver';
import { ProtectionMode } from './core/enums/protection-mode';
import { authGuard } from './core/guards/auth.guard';
import { authResolver } from './core/resolvers/auth.resolver';
import { advancedSettingsResolver } from './shared/resolvers/advanced-settings.resolver';
import { onboardingGuard } from './core/components/onboarding/guard/onboarding.guard';

export const routes: Routes = [{
    path: '',
    loadComponent: () =>
        import('./features/pages/site-layout/site-layout.component').then((m) => m.SiteLayoutComponent),
    canActivate: [authGuard, onboardingGuard],
    runGuardsAndResolvers: 'always',
    resolve: { authMode: authResolver },
    data: { protectionLevel: ProtectionMode.Open },
    children: [
        {
            path: 'chart',
            loadComponent: () => import('./features/pages/temperature-chart/temperature-chart.component').then((m) => m.TemperatureChartComponent),
            resolve: { temperatureReadings: temperatureChartResolver },
            data: { protectionLevel: ProtectionMode.All }
        },
        {
            path: 'list',
            loadComponent: () => import('./features/pages/sensor-list/sensor-list.component').then((m) => m.SensorListComponent),
            resolve: { sensors: sensorsResolver },
            data: { protectionLevel: ProtectionMode.All }

        },
        {
            path: 'sensorDetail/:id',
            loadComponent: () => import('./features/pages/sensor-detail/sensor-detail.component').then((m) => m.SensorDetailComponent),
            resolve: { sensorInformation: sensorInfrmationResolver },
            data: { protectionLevel: ProtectionMode.All }
        },
        {
            path: 'settings',
            loadComponent: () => import('./features/pages/settings/settings.component').then((m) => m.SettingsComponent),
            resolve: {
                timeZones: systemTimeZonesResolver,
                applicationSettings: applicationSettingsResolver
            },
            data: { protectionLevel: ProtectionMode.Settings }
        },
        {
            path: 'advancedSettings',
            loadComponent: () => import('./features/pages/advanced-settings/advanced-settings.component').then((m) => m.AdvancedSettingsComponent),
            resolve: {
                advancedSettings: advancedSettingsResolver
            },
            data: { protectionLevel: ProtectionMode.Allways }
        },
    ]
}];
