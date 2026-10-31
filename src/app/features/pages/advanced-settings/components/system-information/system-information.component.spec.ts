import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';

import { DeviceStatusResult } from 'app/shared/interfaces/device-status-result';
import { SystemInformationComponent } from './system-information.component';

describe('SystemInformationComponent', () => {
  let component: SystemInformationComponent;
  let fixture: ComponentFixture<SystemInformationComponent>;
  let systemStatus: DeviceStatusResult;

  const pageText = () => (fixture.nativeElement as HTMLElement).textContent ?? '';

  const render = async (data: DeviceStatusResult | null) => {
    fixture.componentRef.setInput('data', data);
    await fixture.whenStable();
  };

  beforeEach(async () => {
    systemStatus = {
      memory: { available: '512 MiB', free: '100 MiB' },
      swap: { used: '0 MiB' },
      cpu: { temperature: 45 },
    };

    await TestBed.configureTestingModule({
      imports: [
        SystemInformationComponent,
        TranslocoTestingModule.forRoot({
          langs: {
            en: {},
            'pages/system-information/en': { 'not-available': 'Not available' },
          },
          translocoConfig: { availableLangs: ['en'], defaultLang: 'en' },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SystemInformationComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    await render(systemStatus);

    expect(component).toBeTruthy();
  });

  describe('when the system information is available', () => {
    beforeEach(async () => {
      await render(systemStatus);
    });

    it('should show the memory, swap and cpu values', () => {
      expect(pageText()).toContain('512 MiB');
      expect(pageText()).toContain('100 MiB');
      expect(pageText()).toContain('0 MiB');
      expect(pageText()).toContain('45');
    });

    it('should show the status of each resource', () => {
      expect(pageText()).toContain('Nominal');
      expect(pageText()).not.toContain('Not available');
    });
  });

  describe('when the system information is not available', () => {
    beforeEach(async () => {
      await render(null);
    });

    it('should still show the system status cards', () => {
      expect(fixture.nativeElement.querySelectorAll('section.card')).toHaveLength(3);
    });

    it('should show "Not available" instead of each value and status', () => {
      expect(pageText().match(/Not available/g)).toHaveLength(7);
    });
  });

  describe('when only the cpu temperature is missing', () => {
    beforeEach(async () => {
      await render({ ...systemStatus, cpu: {} as DeviceStatusResult['cpu'] });
    });

    it('should show "Not available" only for the cpu status and temperature', () => {
      expect(pageText().match(/Not available/g)).toHaveLength(2);
    });
  });
});
