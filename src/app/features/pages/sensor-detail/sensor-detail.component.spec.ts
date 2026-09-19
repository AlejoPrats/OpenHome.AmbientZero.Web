import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TuiNotificationService } from '@taiga-ui/core';
import { of } from 'rxjs';

import { SensorService } from 'app/shared/services/sensor.service';
import { SensorDetailComponent } from './sensor-detail.component';

describe('SensorDetailComponent', () => {
  let component: SensorDetailComponent;
  let fixture: ComponentFixture<SensorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              sensorInformation: {
                deviceId: 'test-device',
                deviceVirtualName: 'Test Sensor',
                batteryPercentage: 100,
                isSignaling: false,
                lastReadingTime: new Date('2026-01-01T00:00:00.000Z'),
                lastReadingValue: 20,
                temperatureTendency: 'Stable',
                version: '1.0.0',
                sensorSetting: {
                  isLightEnabled: true,
                  isScheduled: false,
                  disableStartTime: '00:00:00',
                  disableEndTime: '00:00:00',
                },
              },
            }),
          },
        },
        { provide: SensorService, useValue: {} },
        { provide: TuiNotificationService, useValue: { open: vi.fn(() => of(undefined)) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SensorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
