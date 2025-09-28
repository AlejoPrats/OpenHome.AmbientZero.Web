import { CommonModule} from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { TimeZone } from '../interfaces/time-zone';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NEVER, Observable,forkJoin, pipe } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { ApplicationSettings } from '../classes/application-settings';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatButtonToggleModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {

  @Input() timeZones: TimeZone[] = [];
  settingsService: SettingsService = inject(SettingsService);
  toastr: ToastrService = inject(ToastrService);
  calcdate: Date = new Date();
  filteredOptions: Observable<TimeZone[]> = NEVER;
  timezoneSelector = new FormControl('');
  applicationSettings: ApplicationSettings[] = [];

  settingsForm = new FormGroup(
    {
      timeZoneId: new FormControl(''),
      temperatureFormatId: new FormControl(''),
      passwordProtected: new FormControl(''),
      temperatureFormatId2: this.timezoneSelector
    }
  )
  temperatureFormat: any = '';

  ngOnInit() {
    this.filteredOptions = this.timezoneSelector.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
    
  }

  constructor() {
    forkJoin({
      timeZonesResult: this.settingsService.getTimeZones(),
      applicationSettingsResult: this.settingsService.getApplicationSettings()

    }).subscribe(result => {
      this.timeZones = result.timeZonesResult;
      this.applicationSettings = result.applicationSettingsResult
      this.timezoneSelector.setValue(this.getTimeZoneNameFromId(this.applicationSettings.filter(value => value.settingName.includes('TimeZone'))[0]?.settingValue ?? ""));
      this.settingsForm.controls.temperatureFormatId.setValue(this.applicationSettings.filter(value => value.settingName.includes('TemperatureSetting'))[0]?.settingValue ?? "");
    });
  }

  private _filter(value: string): TimeZone[] {
    const filterValue = value.toLowerCase();
    return this.timeZones.filter(option => option.name.toLowerCase().includes(filterValue));
  }


  submitSettings() {

    let applicationSettings: ApplicationSettings[] = [];

    if (this.timezoneSelector.dirty) {
      let selectedTimezoneId = this.timeZones.filter(option => option.name.includes(this.timezoneSelector.value !== null ? this.timezoneSelector.value : ''))[0].id;
      applicationSettings.push(new ApplicationSettings('TimeZone',selectedTimezoneId));
    }

    if (this.settingsForm.controls.temperatureFormatId.dirty) {
      applicationSettings.push(new ApplicationSettings('TemperatureSetting',this.settingsForm.value.temperatureFormatId!));
    }

    if (this.settingsForm.controls.passwordProtected.dirty) {
      alert(this.settingsForm.value.passwordProtected);
    }

    this.settingsService.saveApplicationSettings(applicationSettings).subscribe(config => { 
      this.toastr.success('Settings Updated');
    });
  }

  private getTimeZoneNameFromId(timeZoneId: string) : string
  {
    return this.timeZones.filter(option => option.id.includes(timeZoneId))[0].name;
  }
}
