import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Mock, vi } from 'vitest';
import { SensorListComponent } from './sensor-list.component';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
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

  const setVisibility = (state: DocumentVisibilityState) => {
    visibility = state;
    document.dispatchEvent(new Event('visibilitychange'));
  };

  const setOnline = (value: boolean) => {
    online = value;
    window.dispatchEvent(new Event(value ? 'online' : 'offline'));
  };

  beforeEach(async () => {
    vi.useFakeTimers();
    visibility = 'visible';
    online = true;
    vi.spyOn(document, 'visibilityState', 'get').mockImplementation(() => visibility);
    vi.spyOn(navigator, 'onLine', 'get').mockImplementation(() => online);
    getAllSensors = vi.fn(() => of<SensorInformationResponse[]>([]));

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
        { provide: SensorService, useValue: { getAllSensors } },
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
});
