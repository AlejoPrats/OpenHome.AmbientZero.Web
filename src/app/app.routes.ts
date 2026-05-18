import { Routes } from '@angular/router';
import { sensorsResolver } from './shared/resolvers/sensors-resolver';
import { temperatureChartResolver } from './shared/resolvers/temperature-chart-resolver';
import { systemTimeZonesResolver } from './shared/resolvers/system-resolver';
import { applicationSettingsResolver } from './shared/resolvers/settings-resolver';

export const routes: Routes = [{
    path: '',
    loadComponent: () =>
        import('./features/pages/site-layout/site-layout').then((m) => m.SiteLayout),
    children: [
        {
            path: 'chart',
            loadComponent: () => import('./features/pages/temperature-chart/temperature-chart').then((m) => m.TemperatureChart),
            runGuardsAndResolvers: 'always',
            resolve: { temperatureReadings: temperatureChartResolver }
        },
        {
            path: 'list',
            loadComponent: () => import('./features/pages/sensor-list/sensor-list').then((m) => m.SensorList),
            runGuardsAndResolvers: 'always',
            resolve: { sensors: sensorsResolver }
        },
        {
            path: 'settings',
            loadComponent: () => import('./features/pages/settings/settings').then((m) => m.Settings),
            runGuardsAndResolvers: 'always',
            resolve: {
                timeZones: systemTimeZonesResolver,
                applicationSettings: applicationSettingsResolver
            }
        },
    ]
}];
