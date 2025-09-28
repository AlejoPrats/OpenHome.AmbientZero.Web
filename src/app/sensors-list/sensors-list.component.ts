import { Component, Input, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { SensorInformation } from '../interfaces/sensor-information';
import { SensorsService } from '../services/sensors.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-sensors-list',
    standalone: true,
    imports: [NgFor, NgIf, RouterModule, CommonModule],
    templateUrl: './sensors-list.component.html',
    styleUrl: './sensors-list.component.css'
})
export class SensorsListComponent {
  
  @Input() sensorsInformation:SensorInformation[] = [];
  sensorService: SensorsService = inject(SensorsService);

  constructor()
  {
    this.sensorService.getAllSensors().subscribe(sensorInformation => {
      this.sensorsInformation = sensorInformation;
    });
  }
}
