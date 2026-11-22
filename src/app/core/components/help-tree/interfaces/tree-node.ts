import { IconName } from 'app/shared/components/icon/icon-name.enum';

export interface TreeNode {
  readonly identifier?: string;
  readonly children?: readonly TreeNode[];
  readonly text: string;
  readonly icon?: IconName;
  readonly hasTour?: boolean;
  readonly isExpanded?: boolean;
  isSelected?: boolean;
}
