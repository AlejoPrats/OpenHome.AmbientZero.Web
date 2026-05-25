import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TuiFilterByInputPipe } from '@taiga-ui/core';
import { TuiChevron, TuiComboBox, TuiDataListWrapper, TuiSegmented, TuiTabs } from '@taiga-ui/kit';
import { TimeZone } from '../../../shared/interfaces/time-zone';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { TuiIcon } from '@taiga-ui/core';
import { TuiTabBar } from '@taiga-ui/addon-mobile';
import { ApplicationSettings } from '../../../shared/models/application-settings';
import { number } from 'echarts';

@Component({
  selector: 'app-settings',
  imports: [FormsModule,
    TuiChevron,
    TuiComboBox,
    TuiDataListWrapper,
    TuiFilterByInputPipe,
    TuiSegmented,
    FormsModule,
  TuiTabs],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.less',
})
export class SettingsComponent {
  private readonly route = inject(ActivatedRoute);
  protected readonly buttons = ['Celcius', 'Farenheit', 'Kelvin'];
  protected readonly activeTabIndex = 0;
  protected readonly timeZones = toSignal(
    this.route.data.pipe(map(({ timeZones }) => timeZones as TimeZone[])),
    { initialValue: null },
  );

  protected readonly applicationSettings = toSignal(
    this.route.data.pipe(map(({ applicationSettings }) => applicationSettings as ApplicationSettings[])),
    { initialValue: null },
  );

  protected readonly options = [
    {
      text: 'Home',
      icon: '@tui.home',
    },
    {
      text: 'Photos',
      icon: '@tui.image',
    },
    {
      text: 'Navigation',
      icon: '@tui.map-pin',
    },
  ];

  protected readonly selectedTemperatureUnit = parseInt(this.applicationSettings()!.find(x => x.settingName == 'TemperatureSetting')!.settingValue) - 1;
  protected readonly items = this.timeZones()!.map(x => x.name);

  constructor() {
    this.value = this.items[this.getIndexOfTimeZone()];
  }

  protected value: string | null = null;

  getIndexOfTimeZone() {
    //const timeZoneId = this.applicationSettings()?.find(x => x.settingName == 'TimeZone')?.settingValue;
    //const timeZoneName = this.timeZones()!.find(x => x.id == timeZoneId)!.name;
    return 0 // this.items.indexOf(timeZoneName);
  }

  selected = signal<number>(2);

  setTemperatureUnit(unit: number) {
    console.log(unit);
    this.selected.set(unit);
  }


}