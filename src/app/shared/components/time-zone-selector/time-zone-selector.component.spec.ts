import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SystemService } from 'app/shared/services/system.service';
import { TimeZoneSelectorComponent } from './time-zone-selector.component';

describe('TimeZoneSelectorComponent', () => {
  let component: TimeZoneSelectorComponent;
  let fixture: ComponentFixture<TimeZoneSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeZoneSelectorComponent],
      providers: [
        {
          provide: SystemService,
          useValue: { getTimeZones: vi.fn(() => of([{ id: 'UTC', name: 'UTC' }])) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeZoneSelectorComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('selectedTimezone', 'UTC');
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
