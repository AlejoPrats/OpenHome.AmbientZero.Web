import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { TuiResponsiveDialogService } from '@taiga-ui/addon-mobile';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { of, throwError } from 'rxjs';
import { Mock, vi } from 'vitest';
import { SensorListComponent } from './sensor-list.component';
import { getTranslationModuleMock } from 'app/shared/mocks/translation-module.mock';
import { SensorService } from '../../../shared/services/sensor.service';
import { SensorInformationResponse } from '../../../shared/interfaces/sensor-information-response';

const MINUTE = 60_000;

describe('SensorList', () => {
  let component: SensorListComponent;
  let fixture: ComponentFixture<SensorListComponent>;
  let getAllSensors: Mock<() => ReturnType<SensorService['getAllSensors']>>;
  let visibility: DocumentVisibilityState;
  let online: boolean;
  let sensor: SensorInformationResponse;
  let confirmDelete: Mock<() => ReturnType<TuiResponsiveDialogService['open']>>;
  let deleteSensor: Mock<(sensorId: number) => ReturnType<SensorService['deleteSensor']>>;

  const setVisibility = (state: DocumentVisibilityState) => {
    visibility = state;
    document.dispatchEvent(new Event('visibilitychange'));
  };

  const setOnline = (value: boolean) => {
    online = value;
    window.dispatchEvent(new Event(value ? 'online' : 'offline'));
  };

  const getPage = () => fixture.nativeElement as HTMLElement;

  const getSensorNames = () =>
    Array.from(getPage().querySelectorAll('#sensor-info-row #sensor-name'), (cell) =>
      cell.textContent!.trim(),
    );

  const clickDelete = () => getPage().querySelector<HTMLElement>('#sensor-delete')!.click();

  beforeEach(async () => {
    vi.useFakeTimers();
    visibility = 'visible';
    online = true;
    vi.spyOn(document, 'visibilityState', 'get').mockImplementation(() => visibility);
    vi.spyOn(navigator, 'onLine', 'get').mockImplementation(() => online);
    getAllSensors = vi.fn(() => of<SensorInformationResponse[]>([]));
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
      imports: [SensorListComponent, getTranslationModuleMock()],
      providers: [
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: {
            data: false,
            $implicit: { next: () => undefined, complete: () => undefined },
          },
        },
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { data: of({ sensors: [sensor] }) } },
        { provide: TuiResponsiveDialogService, useValue: { open: confirmDelete } },
        { provide: SensorService, useValue: { getAllSensors, deleteSensor } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SensorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('on initialize', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should not reload sensors before the refresh interval', () => {
      vi.advanceTimersByTime(20 * MINUTE - 1);

      expect(getAllSensors).not.toHaveBeenCalled();
    });
  });

  describe('auto refresh', () => {
    it('should reload sensors every 20 minutes', () => {
      vi.advanceTimersByTime(40 * MINUTE);

      expect(getAllSensors).toHaveBeenCalledTimes(2);
    });

    it('should stop reloading sensors after leaving the page', () => {
      fixture.destroy();
      vi.advanceTimersByTime(40 * MINUTE);

      expect(getAllSensors).not.toHaveBeenCalled();
    });

    it('should keep reloading sensors after a failed reload', () => {
      getAllSensors.mockReturnValueOnce(throwError(() => new Error('Request failed')));

      vi.advanceTimersByTime(40 * MINUTE);

      expect(getAllSensors).toHaveBeenCalledTimes(2);
    });
  });

  describe('when the tab is hidden', () => {
    it('should not reload sensors', () => {
      setVisibility('hidden');
      vi.advanceTimersByTime(60 * MINUTE);

      expect(getAllSensors).not.toHaveBeenCalled();
    });

    it('should reload sensors right away when shown after a missed refresh', () => {
      setVisibility('hidden');
      vi.advanceTimersByTime(25 * MINUTE);

      setVisibility('visible');
      vi.advanceTimersByTime(0);

      expect(getAllSensors).toHaveBeenCalledTimes(1);
    });

    it('should wait for the next refresh when shown before one is due', () => {
      setVisibility('hidden');
      vi.advanceTimersByTime(5 * MINUTE);

      setVisibility('visible');
      vi.advanceTimersByTime(15 * MINUTE - 1);

      expect(getAllSensors).not.toHaveBeenCalled();
    });
  });

  describe('when the device is offline', () => {
    it('should not reload sensors', () => {
      setOnline(false);
      vi.advanceTimersByTime(60 * MINUTE);

      expect(getAllSensors).not.toHaveBeenCalled();
    });

    it('should reload sensors right away when back online after a missed refresh', () => {
      setOnline(false);
      vi.advanceTimersByTime(25 * MINUTE);

      setOnline(true);
      vi.advanceTimersByTime(0);

      expect(getAllSensors).toHaveBeenCalledTimes(1);
    });
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

    it('should remove the sensor from the list when confirmed', () => {
      confirmDelete.mockReturnValue(of(true));

      clickDelete();
      fixture.detectChanges();

      expect(getSensorNames()).not.toContain(sensor.deviceVirtualName);
    });

    it('should keep the sensor when declined', () => {
      clickDelete();

      expect(deleteSensor).not.toHaveBeenCalled();
    });
  });
});
