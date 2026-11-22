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

  const isTopicShown = (name: string) => {
    const node = topic(name);
    return !!node && !node.closest('tui-expand:not(._expanded)');
  };

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

  it('should start with the topic groups collapsed', () => {
    expect(isTopicShown('Advanced Settings')).toBe(true);
    expect(isTopicShown('General')).toBe(false);
  });

  it('should expand a topic group when it is clicked', async () => {
    topic('Advanced Settings').click();
    await fixture.whenStable();

    expect(isTopicShown('General')).toBe(true);
  });

  it('should reveal topics inside collapsed groups that match the search', async () => {
    const search = element.querySelector<HTMLInputElement>(
      'input[aria-label="Search help topics"]',
    )!;
    search.value = 'network';
    search.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(isTopicShown('Network')).toBe(true);
  });

  it('should show the chosen help topic', async () => {
    topic('Sensors').click();
    await fixture.whenStable();

    expect(element.querySelector('app-sensors')).not.toBeNull();
    expect(element.querySelector('app-about')).toBeNull();
  });
});
