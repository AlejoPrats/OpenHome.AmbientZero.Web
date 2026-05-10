import { Routes } from '@angular/router';
import { sensorsResolver } from './shared/resolvers/sensors-resolver';

export const routes: Routes = [{
    path: '',
    loadComponent: () =>
        import('./features/pages/site-layout/site-layout').then((m) => m.SiteLayout),
    children: [
        {
            path: 'chart',
            loadComponent: () => import('./features/pages/temperature-chart/temperature-chart').then((m) => m.TemperatureChart)
        },
        {
            path: 'list',
            loadComponent: () => import('./features/pages/sensor-list/sensor-list').then((m) => m.SensorList),
            runGuardsAndResolvers: 'always',
            resolve: { sensors: sensorsResolver }
        },
        {
            path: 'settings',
            loadComponent: () => import('./features/pages/settings/settings').then((m) => m.Settings)
        },
    ]
}];
