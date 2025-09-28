import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SensorDetailsComponent } from './sensor-details/sensor-details.component';
import { SensorsListComponent } from './sensors-list/sensors-list.component';
import { TemperatureChartComponent } from './temperature-chart/temperature-chart.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [{
    path: '',
    component: HomeComponent,
    title: 'Home Page',
},
{
    path: 'sensorDetail/:id',
    component: SensorDetailsComponent,
    title: 'Sensor Detail'
},
{
    path: 'list',
    component: SensorsListComponent,
    title: 'Sensors List'
},
{
    path: 'chart',
    component: TemperatureChartComponent,
    title: 'Temperature Chart'
},
{
    path: 'settings',
    component: SettingsComponent,
    title: 'Settings'
}];
