import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimedAutoRefreshModalComponent } from './timed-auto-refresh-modal.component';

describe('TimedAutoRefreshModalComponent', () => {
  let component: TimedAutoRefreshModalComponent;
  let fixture: ComponentFixture<TimedAutoRefreshModalComponent>;

  beforeEach(async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));

    await TestBed.configureTestingModule({
      imports: [TimedAutoRefreshModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimedAutoRefreshModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    fixture.destroy();
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
