import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimedAutoRefreshModalComponent } from './timed-auto-refresh-modal.component';

describe('TimedAutoRefreshModalComponent', () => {
  let component: TimedAutoRefreshModalComponent;
  let fixture: ComponentFixture<TimedAutoRefreshModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimedAutoRefreshModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimedAutoRefreshModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
