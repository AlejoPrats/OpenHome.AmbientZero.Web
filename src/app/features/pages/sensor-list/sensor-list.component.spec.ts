import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { TuiResponsiveDialogService } from '@taiga-ui/addon-mobile';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { of } from 'rxjs';
import { Mock, vi } from 'vitest';
import { SensorListComponent } from './sensor-list.component';
import { getTranslationModuleMock } from 'app/shared/mocks/translation-module.mock';
import { SensorService } from '../../../shared/services/sensor.service';
import { SensorInformationResponse } from '../../../shared/interfaces/sensor-information-response';

describe('SensorList', () => {
  let component: SensorListComponent;
  let harness: RouterTestingHarness;
  let sensor: SensorInformationResponse;
  let confirmDelete: Mock<() => ReturnType<TuiResponsiveDialogService['open']>>;
  let deleteSensor: Mock<(sensorId: number) => ReturnType<SensorService['deleteSensor']>>;

  const clickDelete = () =>
    harness.routeNativeElement!.querySelector<HTMLElement>('#sensor-delete')!.click();

  beforeEach(async () => {
    sensor = {
      id: 1,
      deviceId: 'test-device-1',
      deviceVirtualName: 'Test Sensor 1',
      rawADCReading: 1000,
      batteryPercentage: 100,
      isSignaling: false,
      lastReadingTime: new Date('2026-01-01T00:00:00Z'),
      lastReadingValue: 20,
      temperatureTendency: 'Rising',
      version: '1.0.0',
      sensorSetting: {
        isLightEnabled: false,
        isScheduled: false,
        disableStartTime: '00:00',
        disableEndTime: '00:00',
      },
    };
    confirmDelete = vi.fn(() => of(false));
    deleteSensor = vi.fn(() => of(undefined));

    await TestBed.configureTestingModule({
      imports: [getTranslationModuleMock()],
      providers: [
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: {
            data: false,
            $implicit: { next: () => undefined, complete: () => undefined },
          },
        },
        provideRouter([
          { path: '', component: SensorListComponent, resolve: { sensors: () => [sensor] } },
        ]),
        { provide: TuiResponsiveDialogService, useValue: { open: confirmDelete } },
        { provide: SensorService, useValue: { deleteSensor } },
      ],
    }).compileComponents();

    harness = await RouterTestingHarness.create();
    component = await harness.navigateByUrl('/', SensorListComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when deleting a sensor', () => {
    it('should ask for confirmation', () => {
      clickDelete();

      expect(confirmDelete).toHaveBeenCalledTimes(1);
    });

    it('should delete the sensor when confirmed', () => {
      confirmDelete.mockReturnValue(of(true));

      clickDelete();

      expect(deleteSensor).toHaveBeenCalledWith(sensor.id);
    });

    it('should keep the sensor when declined', () => {
      clickDelete();

      expect(deleteSensor).not.toHaveBeenCalled();
    });
  });
});
