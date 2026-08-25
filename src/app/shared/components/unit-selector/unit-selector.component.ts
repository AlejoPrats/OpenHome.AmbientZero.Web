import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { TuiChevron, TuiDataListWrapper, TuiSelect } from '@taiga-ui/kit';
import { UnitInterface } from './unit-interface';
import { ThemeService } from 'app/core/services/theme.service';

@Component({
  selector: 'app-unit-selector',
  imports: [FormsModule, TuiChevron, TuiDataListWrapper, TuiSelect, TranslocoModule],
  templateUrl: './unit-selector.component.html',
  styleUrl: './unit-selector.component.less',
})
export class UnitSelectorComponent {
  protected theme = inject(ThemeService);
  protected value: UnitInterface | null = null;
  valueChanged = output<number | undefined>();

  public readonly units: UnitInterface[] = [
    { name: 'Celcius', unitValue: 1, exampleValue: '20C' },
    { name: 'Farenheit', unitValue: 2, exampleValue: '68F' },
    { name: 'Kelvin', unitValue: 3, exampleValue: '293,15K' }
  ];

  unitChanged() {
    this.valueChanged.emit(this.value?.unitValue);
  }


}
