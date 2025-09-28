import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SensorInformation } from '../interfaces/sensor-information';
import { SensorsService } from '../services/sensors.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NameUpdateRequest } from '../classes/name-update-request';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SettingsService } from '../services/settings.service';
import { SensorUpdateRequest } from '../classes/sensor-update-request';
import { format, parse } from "date-fns";

@Component({
  selector: 'app-sensor-details',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTimepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './sensor-details.component.html',
  styleUrl: './sensor-details.component.css'
})
export class SensorDetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  sensorService = inject(SensorsService);
  settingsService: SettingsService = inject(SettingsService);
  toastr: ToastrService = inject(ToastrService);
  selectedSensor: SensorInformation | undefined;
  showNameEditorForm: boolean = false;
  deviceSettingsForm = new FormGroup(
    {
      deviceVirtualName: new FormControl(''),
      isLightEnabled: new FormControl<boolean | null>(null),
      isScheduled: new FormControl<boolean | null>(null),
      disableStartTime: new FormControl<Date | null>(null),
      disableEndTime: new FormControl<Date | null>(null)
    });

  ngOnInit() {
    this.sensorService.getSensorById(this.route.snapshot.params['id']).subscribe(result => {
      this.selectedSensor = result;
      let disableEndTime: Date | null = null;
      let disableStartTime: Date | null = null;

      if (result.sensorSetting.disableEndTime) {
        disableEndTime = parse(result.sensorSetting.disableEndTime, 'HH:mm:ss', new Date());
      }

      if (result.sensorSetting.disableStartTime) {
        disableStartTime = parse(result.sensorSetting.disableStartTime, 'HH:mm:ss', new Date());
      }

      this.deviceSettingsForm.controls.isLightEnabled.setValue(result.sensorSetting.isLightEnabled);
      this.deviceSettingsForm.controls.isScheduled.setValue(result.sensorSetting.isScheduled);
      this.deviceSettingsForm.controls.disableEndTime.setValue(disableEndTime);
      this.deviceSettingsForm.controls.disableStartTime.setValue(disableStartTime);
    });
  }

  constructor() {

  }

  public editName() {
    this.showNameEditorForm = true;
  }

  public cancelNameEdition() {
    this.showNameEditorForm = false;
    this.deviceSettingsForm.controls.deviceVirtualName.setValue('');
    this.deviceSettingsForm.controls.deviceVirtualName.markAsPristine();
  }

  public updateName() {
    this.sensorService.updateSensorName(new NameUpdateRequest(this.selectedSensor!.deviceId, this.deviceSettingsForm.value.deviceVirtualName ?? "")).subscribe(result => {
      this.toastr.success("Name Updated!");
      this.deviceSettingsForm.controls.deviceVirtualName.markAsPristine();
      this.showNameEditorForm = false;
    });
  }

  public submitSensorSettings() {

    let enableLightTime: string | null = null;
    let disableLightTime: string | null = null;

    if (this.deviceSettingsForm.value.isScheduled ?? false) {
      if (this.deviceSettingsForm.value.disableStartTime) {
        enableLightTime = this.getTimeOnly(this.deviceSettingsForm.value.disableStartTime as unknown as Date);
      }

      if (this.deviceSettingsForm.value.disableEndTime) {
        disableLightTime = this.getTimeOnly(this.deviceSettingsForm.value.disableEndTime as unknown as Date);
      }
    }

    var sensorSettings = new SensorUpdateRequest(
      this.selectedSensor!.deviceId,
      this.deviceSettingsForm.value.isLightEnabled ?? false,
      this.deviceSettingsForm.value.isScheduled ?? false,
      enableLightTime,
      disableLightTime);

    this.settingsService.saveSensorSettings(sensorSettings)
      .subscribe(
        result => {
          this.toastr.success("Sensor Settings Updated!");
        });
  }

  private getTimeOnly(date: Date): string {
    return format(date, 'HH:mm:ss');
  }
}
