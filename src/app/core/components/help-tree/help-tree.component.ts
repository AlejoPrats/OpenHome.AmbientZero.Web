import { Component, computed, input, output, signal } from '@angular/core';
import { TUI_TREE_CONTENT, TuiTree } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { TreeNodeContentComponent } from './content/tree-node-content/tree-node-content.component';
import { TuiHandler } from '@taiga-ui/cdk';
import { TreeNode } from './interfaces/tree-node';
import { IconComponent } from 'app/shared/components/icon/icon.component';
import { IconName } from 'app/shared/components/icon/icon-name.enum';
import { TuiButton, TuiInput, TuiTextfieldComponent, TuiHintDirective } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-help-tree',
  imports: [
    TuiTree,
    IconComponent,
    TuiTextfieldComponent,
    TuiInput,
    TuiButton,
    TuiHintDirective,
    FormsModule,
  ],
  templateUrl: './help-tree.component.html',
  styleUrl: './help-tree.component.less',
  providers: [
    {
      provide: TUI_TREE_CONTENT,
      useValue: new PolymorpheusComponent(TreeNodeContentComponent),
    },
  ],
})
export class HelpTreeComponent {
  readonly treeData = input.required<TreeNode>();
  readonly collapsedIcon = input.required<IconName>();
  readonly expandedIcon = input.required<IconName>();
  readonly searchText = signal('');
  protected readonly isSearching = computed(() => this.searchText().trim().length > 0);
  protected defaultIcon: IconName = IconName.CircleQuestion;
  readonly nodeClicked = output<string>();
  readonly buttonClicked = output<string>();
  readonly map = new Map<TreeNode, boolean>();
  protected selectedNodeIdentifier: string = '';

  readonly data = computed<TreeNode>(() => {
    const query = this.searchText().trim().toLowerCase();
    const root = this.treeData();

    if (!query) {
      this.map.clear();
      this.map.set(root, true);
      return root;
    }

    const filteredList = {
      ...root,
      children: this.filterChildren(root.children ?? [], query),
    };

    return filteredList;
  });

  private filterChildren(nodes: readonly TreeNode[], query: string): TreeNode[] {
    const matches: TreeNode[] = [];

    for (const node of nodes) {
      const selfMatches = node.text.toLowerCase().includes(query);
      const matchingChildren = node.children ? this.filterChildren(node.children, query) : [];

      if (selfMatches || matchingChildren.length > 0) {
        matches.push({
          ...node,
          children: matchingChildren.length > 0 ? matchingChildren : node.children,
        });
      }
    }
    return matches;
  }

  nodeClick(node: TreeNode) {
    if (!node.children) {
      this.nodeClicked.emit(node.identifier ?? 'error');
    }
  }

  onActionClick(event: MouseEvent, node: TreeNode): void {
    event.stopPropagation();
    this.buttonClicked.emit(node.identifier ?? 'error');
  }

  protected readonly handler: TuiHandler<TreeNode, readonly TreeNode[]> = (item) =>
    item.children || [];
}
