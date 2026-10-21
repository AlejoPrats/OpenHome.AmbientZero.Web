import { Component, ViewChild } from '@angular/core';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { TuiDialogContext } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';

@Component({
  selector: 'app-import-upload-modal',
  imports: [FileUploadComponent],
  templateUrl: './import-upload-modal.component.html',
  styleUrl: './import-upload-modal.component.less',
})
export class ImportUploadModalComponent {
  @ViewChild(FileUploadComponent)
  fileUpload!: FileUploadComponent;
  protected hasFile: boolean = false;
  protected readonly context = injectContext<TuiDialogContext<void, string>>();

  fileChanged(fileStatus: boolean) {
    this.hasFile = fileStatus;
  }

  submit() {
    this.fileUpload.reset();
    this.context.$implicit.complete();
  }
}
