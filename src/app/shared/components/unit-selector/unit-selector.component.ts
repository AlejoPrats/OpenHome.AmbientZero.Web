import { Component, inject, input, OnInit, output } from '@angular/core';
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
export class UnitSelectorComponent implements OnInit {
  protected theme = inject(ThemeService);
  protected value: UnitInterface | null = null;
  selectedUnit = input<number | undefined>();
  valueChanged = output<number | undefined>();

  ngOnInit() {
    if (this.selectedUnit() !== undefined) {
      this.value = this.units.find((x) => x.unitValue === this.selectedUnit()) ?? null;
    }
  }

  public readonly units: UnitInterface[] = [
    { name: 'Celcius', unitValue: 0, exampleValue: '20C' },
    { name: 'Farenheit', unitValue: 1, exampleValue: '68F' },
    { name: 'Kelvin', unitValue: 2, exampleValue: '293,15K' },
  ];

  unitChanged() {
    this.valueChanged.emit(this.value?.unitValue);
  }
}
