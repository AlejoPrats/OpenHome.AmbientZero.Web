import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  private readonly document = inject(DOCUMENT);

  public downloadFromResponse(
    response: HttpResponse<Blob>,
    defaultFallbackName = 'download.bin',
  ): void {
    const blobData = response.body;
    if (!blobData) {
      throw new Error('Download failed: Response body is empty.');
    }

    const filename = this.extractFilename(response, defaultFallbackName);

    this.triggerBrowserDownload(blobData, filename);
  }

  private extractFilename(response: HttpResponse<Blob>, defaultFallbackName: string): string {
    const contentDisposition = response.headers.get('content-disposition');

    if (contentDisposition && contentDisposition.includes('filename=')) {
      const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
      if (matches != null && matches[1]) {
        return matches[1].replace(/['"]/g, '').trim();
      }
    }

    const customFilenameHeader = response.headers.get('x-filename');
    if (customFilenameHeader) {
      return customFilenameHeader.trim();
    }

    return defaultFallbackName;
  }

  private triggerBrowserDownload(blob: Blob, filename: string): void {
    const windowUrl: typeof URL = window.URL;
    const downloadUrl = windowUrl.createObjectURL(blob);

    const anchor = this.document.createElement('a');
    anchor.href = downloadUrl;
    anchor.download = filename;

    this.document.body.appendChild(anchor);
    anchor.click();

    this.document.body.removeChild(anchor);
    windowUrl.revokeObjectURL(downloadUrl);
  }
}
