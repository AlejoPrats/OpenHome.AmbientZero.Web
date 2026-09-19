import { Component, EventEmitter, input, Output, signal } from '@angular/core';
import { TuiIcon, TuiHintDirective, TuiHint } from '@taiga-ui/core';
import { NabVarItem } from './nab-var-item';

@Component({
  selector: 'app-nav-bar',
  imports: [TuiIcon, TuiHint, TuiHintDirective],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.less',
})
export class NavBarComponent {
  @Output() readonly activeItemIndexChange = new EventEmitter<number>();

  readonly tabs = input.required<NabVarItem[]>();
  protected index = signal(0);

  setActive(i: number) {
    this.index.set(i);
    this.activeItemIndexChange.emit(i);
  }
}
