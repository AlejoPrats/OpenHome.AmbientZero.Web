import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { TimeZone } from 'app/shared/interfaces/time-zone';
import { SystemService } from 'app/shared/services/system.service';
import { TimeZoneSelectorComponent } from './time-zone-selector.component';

describe('TimeZoneSelectorComponent', () => {
  let component: TimeZoneSelectorComponent;
  let fixture: ComponentFixture<TimeZoneSelectorComponent>;
  let timeZones: TimeZone[];
  let timeZonesResponse: Subject<TimeZone[]>;

  const getTimeZoneInput = () =>
    (fixture.nativeElement as HTMLElement).querySelector<HTMLInputElement>('input')!;

  const renderComponent = async (selectedTimezone: string | undefined) => {
    fixture = TestBed.createComponent(TimeZoneSelectorComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('selectedTimezone', selectedTimezone);
    await fixture.whenStable();
    timeZonesResponse.next(timeZones);
    await fixture.whenStable();
  };

  beforeEach(async () => {
    timeZones = [
      { id: 'test-zone-1', name: 'Test Zone 1' },
      { id: 'test-zone-2', name: 'Test Zone 2' },
    ];
    timeZonesResponse = new Subject<TimeZone[]>();

    await TestBed.configureTestingModule({
      imports: [TimeZoneSelectorComponent],
      providers: [
        { provide: SystemService, useValue: { getTimeZones: vi.fn(() => timeZonesResponse) } },
      ],
    }).compileComponents();
  });

  it('should create', async () => {
    await renderComponent(undefined);

    expect(component).toBeTruthy();
  });

  it('should show the saved time zone', async () => {
    await renderComponent('test-zone-2');

    expect(getTimeZoneInput().value).toBe('Test Zone 2');
  });

  it('should stay empty when no time zone is saved', async () => {
    await renderComponent(undefined);

    expect(getTimeZoneInput().value).toBe('');
  });
});
