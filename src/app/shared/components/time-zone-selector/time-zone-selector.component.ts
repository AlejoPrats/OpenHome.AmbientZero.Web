import { Component, ElementRef, inject, OnInit, output, ViewChild } from '@angular/core';
import { ThemeService } from 'app/core/services/theme.service';
import { TimeZone } from 'app/shared/interfaces/time-zone';
import { TuiDropdown, TuiFilterByInputPipe } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';
import { TuiChevron, TuiComboBox, TuiDataListWrapper, TuiInputChip, TuiInputNumber, TuiMultiSelect, TuiSelect } from '@taiga-ui/kit';
import { TranslocoModule } from '@jsverse/transloco';
import { SystemService } from 'app/shared/services/system.service';
import { TuiDropdownMobile } from '@taiga-ui/addon-mobile';
import { TuiStringHandler } from '@taiga-ui/cdk';

@Component({
  selector: 'app-time-zone-selector',
  imports: [FormsModule, TuiChevron, TuiDataListWrapper, TuiSelect, TranslocoModule, TuiFilterByInputPipe,
    TuiComboBox,
    TuiDataListWrapper,
    TuiDropdown,
    TuiDropdownMobile,
    TuiFilterByInputPipe,
    TuiInputChip,
    TuiInputNumber,
    TuiMultiSelect,
    TuiSelect],
  templateUrl: './time-zone-selector.component.html',
  styleUrl: './time-zone-selector.component.less',
})
export class TimeZoneSelectorComponent implements OnInit {
  @ViewChild('tzInput', { static: false }) tzInput!: ElementRef<HTMLInputElement>;
  systemService = inject(SystemService);
  theme = inject(ThemeService);
  timeZones: TimeZone[] = [];
  protected value: TimeZone | null = null;
  valueChanged = output<string | undefined>();
  stringifyTimezone = (item: TimeZone) => item.name;

  ngOnInit() {
    this.systemService.getTimeZones().subscribe({
      next: (result) => {
        this.timeZones = result;
      }
    });
  }

  timezoneChanged() {
    this.valueChanged.emit(this.value?.id);
    setTimeout(() => {
      const el = this.tzInput.nativeElement;
      el.focus();
      el.setSelectionRange(0, 0); // move cursor to the beginning
    });
  }
}
