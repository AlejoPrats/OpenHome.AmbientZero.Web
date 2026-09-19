import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollIndicatorComponent } from './scroll-indicator.component';

describe('ScrollIndicatorComponent', () => {
  let component: ScrollIndicatorComponent;
  let fixture: ComponentFixture<ScrollIndicatorComponent>;

  beforeEach(async () => {
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(_callback: ResizeObserverCallback) {}
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    );

    await TestBed.configureTestingModule({
      imports: [ScrollIndicatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    fixture.destroy();
    vi.unstubAllGlobals();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
