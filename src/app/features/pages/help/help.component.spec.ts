import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpComponent } from './help.component';
import { BreadcrumbService } from 'app/core/services/breadcrumb.service';

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;
  let element: HTMLElement;

  const topic = (name: string) =>
    Array.from(element.querySelectorAll<HTMLElement>('.tree-node-container')).find(
      (node) => node.textContent?.trim() === name,
    )!;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show Help as the current page in the breadcrumb', () => {
    expect(TestBed.inject(BreadcrumbService).getBreadcrumbs()).toEqual(['Help']);
  });

  it('should show the about page until a topic is chosen', () => {
    expect(element.querySelector('app-about')).not.toBeNull();
  });

  it('should show the chosen help topic', async () => {
    topic('Sensors').click();
    await fixture.whenStable();

    expect(element.querySelector('app-sensors')).not.toBeNull();
    expect(element.querySelector('app-about')).toBeNull();
  });
});
