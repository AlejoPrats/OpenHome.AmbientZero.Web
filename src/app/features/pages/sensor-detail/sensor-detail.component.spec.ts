import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideTaiga, TuiNotificationService, TuiRoot } from '@taiga-ui/core';
import { of } from 'rxjs';
import { Mock, vi } from 'vitest';

import { SensorService } from 'app/shared/services/sensor.service';
import { SensorDetailComponent } from './sensor-detail.component';
import { getTranslationModuleMock } from 'app/shared/mocks/translation-module.mock';
import { SensorInformationResponse } from 'app/shared/interfaces/sensor-information-response';
import { NameUpdateRequest } from 'app/shared/models/name-update-request';

@Component({
  imports: [TuiRoot, SensorDetailComponent],
  template: '<tui-root><app-sensor-detail /></tui-root>',
})
class HostComponent {}

describe('SensorDetailComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let sensor: SensorInformationResponse;
  let updateSensorName: Mock<
    (request: NameUpdateRequest) => ReturnType<SensorService['updateSensorName']>
  >;

  const buttonNamed = (name: string) =>
    Array.from(document.querySelectorAll<HTMLButtonElement>('button')).find(
      (button) => button.textContent?.trim() === name,
    )!;

  const openRenameDialog = async () => {
    buttonNamed('en.sensor.rename').click();
    fixture.detectChanges();
    await fixture.whenStable();
  };

  const typeName = async (name: string) => {
    const input = document.querySelector<HTMLInputElement>('tui-dialog input')!;
    input.value = name;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
  };

  beforeEach(async () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );
    sensor = {
      id: 1,
      deviceId: 'test-device',
      deviceVirtualName: 'Test Sensor',
      rawADCReading: 1000,
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
    };
    updateSensorName = vi.fn(() => of(undefined));

    await TestBed.configureTestingModule({
      imports: [HostComponent, getTranslationModuleMock()],
      providers: [
        provideTaiga(),
        { provide: ActivatedRoute, useValue: { data: of({ sensorInformation: sensor }) } },
        { provide: SensorService, useValue: { updateSensorName } },
        { provide: TuiNotificationService, useValue: { open: vi.fn(() => of(undefined)) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should create', () => {
    expect(fixture.nativeElement.querySelector('app-sensor-detail')).not.toBeNull();
  });

  describe('when renaming', () => {
    beforeEach(async () => {
      await openRenameDialog();
    });

    it('should save the name without surrounding spaces', async () => {
      await typeName('  Garage  ');

      buttonNamed('en.sensor.save').click();

      expect(updateSensorName).toHaveBeenCalledWith(new NameUpdateRequest('test-device', 'Garage'));
    });
  });
});
