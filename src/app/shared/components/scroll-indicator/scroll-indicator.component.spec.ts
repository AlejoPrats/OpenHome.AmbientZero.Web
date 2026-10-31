import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockInstance } from 'vitest';

import { ScrollIndicatorComponent } from './scroll-indicator.component';

describe('ScrollIndicatorComponent', () => {
  let component: ScrollIndicatorComponent;
  let fixture: ComponentFixture<ScrollIndicatorComponent>;
  let scrollHeight: MockInstance<() => number>;

  beforeEach(async () => {
    vi.useFakeTimers();
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    scrollHeight = vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(2000);
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
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when the page can scroll further', () => {
    const clickIndicator = () =>
      (fixture.nativeElement as HTMLElement)
        .querySelector<HTMLElement>('.scroll-indicator')!
        .click();

    it('should update the indicator once after repeated clicks', () => {
      clickIndicator();
      clickIndicator();
      scrollHeight.mockClear();

      vi.advanceTimersByTime(400);

      expect(scrollHeight).toHaveBeenCalledTimes(1);
    });

    it('should not update the indicator after being destroyed', () => {
      clickIndicator();
      fixture.destroy();
      scrollHeight.mockClear();

      vi.advanceTimersByTime(400);

      expect(scrollHeight).not.toHaveBeenCalled();
    });
  });
});
