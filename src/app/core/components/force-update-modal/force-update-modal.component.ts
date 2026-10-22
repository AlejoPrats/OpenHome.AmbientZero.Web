import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { NabVarItem } from 'app/shared/components/nav-bar/nab-var-item';
import { NavBarComponent } from 'app/shared/components/nav-bar/nav-bar.component';
import { TuiFiles } from '@taiga-ui/kit';
import { FormsModule } from '@angular/forms';
import { TuiButton, TuiDialogContext } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { ModuleUpdateRequest } from 'app/shared/models/module-update-request';
import { FileUploadComponent } from '../file-upload/file-upload.component';

@Component({
  selector: 'app-force-update-modal',
  imports: [NavBarComponent, FormsModule, TuiFiles, TuiButton, FileUploadComponent],
  templateUrl: './force-update-modal.component.html',
  styleUrl: './force-update-modal.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(submit.prevent)': 'context.completeWith(response)' },
})
export class ForceUpdateModalComponent {
  @ViewChild(FileUploadComponent)
  fileUpload!: FileUploadComponent;
  protected readonly context = injectContext<TuiDialogContext<ModuleUpdateRequest, string>>();
  protected showFileUpload: boolean = false;
  protected response: ModuleUpdateRequest = new ModuleUpdateRequest(this.context.data, true, false);
  readonly tabs: NabVarItem[] = [
    {
      id: 0,
      selectorId: 'advanced-settings-general-tab',
      label: 'Update From Server',
      icon: '@tui.globe-check',
      enabled: true,
    },
    {
      id: 1,
      selectorId: 'advanced-settings-network-tab',
      label: 'Update From File',
      icon: '@tui.upload',
      enabled: true,
    },
  ];

  onTabChange(i: number) {
    if (i == 0) {
      this.fileUpload.reset();
    } else {
      this.showFileUpload = true;
    }
  }

  fileChanged(fileStatus: boolean) {
    this.response.hasFile = fileStatus;
  }

  protected submit() {
    this.context.$implicit.next(this.response);
    this.context.$implicit.complete();
  }
}
