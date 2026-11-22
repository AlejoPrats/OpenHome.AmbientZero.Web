import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeSensorsModalComponent } from './merge-sensors-modal.component';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';

describe('MergeSensorsModalComponent', () => {
  let component: MergeSensorsModalComponent;
  let fixture: ComponentFixture<MergeSensorsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: {
            data: {
              isForcedMerge: false,
              sensorsList: [
                {
                  id: 1,
                  deviceId: 'f0fefc86-79c3-466f-a319-5fc6b0a5e711',
                  deviceVirtualName: 'Sensor 1',
                  rawADCReading: 19344,
                  batteryPercentage: 4,
                  isSignaling: false,
                  lastReadingTime: '2026-11-19T16:16:08.2075703',
                  lastReadingValue: 78.76399,
                  temperatureTendency: 'Descending',
                  isMigrated: null,
                  version: null,
                  sensorSetting: {
                    deviceId: 'f0fefc86-79c3-466f-a319-5fc6b0a5e711',
                    isLightEnabled: true,
                    isScheduled: false,
                    color: null,
                    disableStartTime: null,
                    disableEndTime: null,
                  },
                },
              ],
            },
            $implicit: { next: () => undefined, complete: () => undefined },
          },
        },
      ],
      imports: [MergeSensorsModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MergeSensorsModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
