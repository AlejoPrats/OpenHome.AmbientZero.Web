import { Routes } from '@angular/router';
import { sensorInfrmationResolver, sensorsResolver } from './shared/resolvers/sensors-resolver';
import { temperatureChartResolver } from './shared/resolvers/temperature-chart-resolver';
import { systemTimeZonesResolver } from './shared/resolvers/system-resolver';
import { applicationSettingsResolver } from './shared/resolvers/settings-resolver';

export const routes: Routes = [{
    path: '',
    loadComponent: () =>
        import('./features/pages/site-layout/site-layout.component').then((m) => m.SiteLayoutComponent),
    children: [
        {
            path: 'chart',
            loadComponent: () => import('./features/pages/temperature-chart/temperature-chart.component').then((m) => m.TemperatureChartComponent),
            runGuardsAndResolvers: 'always',
            resolve: { temperatureReadings: temperatureChartResolver }
        },
        {
            path: 'list',
            loadComponent: () => import('./features/pages/sensor-list/sensor-list.component').then((m) => m.SensorListComponent),
            runGuardsAndResolvers: 'always',
            resolve: { sensors: sensorsResolver }
        },
        {
            path: 'sensorDetail/:id',
            loadComponent: () => import('./features/pages/sensor-detail/sensor-detail.component').then((m) => m.SensorDetailComponent),
            runGuardsAndResolvers: 'always',
            resolve: { sensorInformation: sensorInfrmationResolver }
        },
        {
            path: 'settings',
            loadComponent: () => import('./features/pages/settings/settings.component').then((m) => m.SettingsComponent),
            runGuardsAndResolvers: 'always',
            resolve: {
                timeZones: systemTimeZonesResolver,
                applicationSettings: applicationSettingsResolver
            }
        },
    ]
}];
