import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private breadcrumbs= signal<string[]>([]);

  getBreadcrumbs(): string[] {
    return this.breadcrumbs();
  }

  clearBreadcrumbs() {
    this.breadcrumbs.set([]);
  }

  addBreadcrumb(pageName:string)
  {
    this.breadcrumbs.update(list => [...list, pageName]);
  }

  removeLastBreadcrumb()
  {
    this.breadcrumbs.update(list => list.slice(0, -1));
  }
}
