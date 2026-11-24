import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiTreeItemContent } from '@taiga-ui/kit';

@Component({
  imports: [NgTemplateOutlet],
  templateUrl: './tree-node-content.component.html',
  styleUrl: './tree-node-content.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(click)': 'onClick()' },
})
export class TreeNodeContentComponent extends TuiTreeItemContent {}
