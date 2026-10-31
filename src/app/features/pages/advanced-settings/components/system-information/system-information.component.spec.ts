import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceStatusResult } from 'app/shared/interfaces/device-status-result';
import { getTranslationModuleMock } from 'app/shared/mocks/translation-module.mock';
import { SystemInformationComponent } from './system-information.component';

const NOT_AVAILABLE = 'system-information.not-available';

describe('SystemInformationComponent', () => {
  let component: SystemInformationComponent;
  let fixture: ComponentFixture<SystemInformationComponent>;
  let systemStatus: DeviceStatusResult;

  const cards = () =>
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('section.card');

  const card = (index: number) => cards()[index];

  const statusIcon = (index: number) => card(index).querySelector('.brief-status tui-icon')!;

  const statusLabel = (index: number) =>
    card(index).querySelector('.brief-status [tuiTitle] > div:last-child')!.textContent!.trim();

  const values = (index: number) =>
    Array.from(card(index).querySelectorAll('.cell-field'), (cell) => cell.textContent!.trim());

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
      imports: [SystemInformationComponent, getTranslationModuleMock()],
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
      expect(values(0)).toEqual(['512 MiB', '100 MiB']);
      expect(values(1)).toEqual(['0 MiB']);
      expect(values(2)).toEqual(['45']);
    });

    it('should show the status of each resource', () => {
      expect([statusLabel(0), statusLabel(1), statusLabel(2)]).toEqual([
        'Nominal',
        'Nominal',
        'Nominal',
      ]);
    });
  });

  describe('when the system information is not available', () => {
    beforeEach(async () => {
      await render(null);
    });

    it('should still show the system status cards', () => {
      expect(cards()).toHaveLength(3);
    });

    it.each`
      resource  | index
      ${'ram'}  | ${0}
      ${'swap'} | ${1}
      ${'cpu'}  | ${2}
    `('should show the  status and values as not available', ({ index }) => {
      expect(statusLabel(index)).toContain(NOT_AVAILABLE);
      expect(values(index).every((value) => value.includes(NOT_AVAILABLE))).toBe(true);
    });
  });

  describe('when only the cpu temperature is missing', () => {
    beforeEach(async () => {
      await render({ ...systemStatus, cpu: {} as DeviceStatusResult['cpu'] });
    });

    it('should show the cpu status and temperature as not available', () => {
      expect(statusLabel(2)).toContain(NOT_AVAILABLE);
      expect(values(2)).toEqual([expect.stringContaining(NOT_AVAILABLE)]);
    });

    it('should keep the ram and swap status', () => {
      expect([statusLabel(0), statusLabel(1)]).toEqual(['Nominal', 'Nominal']);
    });
  });

  describe('ram status', () => {
    it.each`
      free          | label                     | className
      ${'100 MiB'}  | ${'Nominal'}              | ${'status-good'}
      ${'70 MiB'}   | ${'Nominal'}              | ${'status-good'}
      ${'69 MiB'}   | ${'Low but safe'}         | ${'status-warning'}
      ${'31 MiB'}   | ${'Low but safe'}         | ${'status-warning'}
      ${'30 MiB'}   | ${'Very low and at risk'} | ${'status-risk'}
      ${'1.00 GiB'} | ${NOT_AVAILABLE}          | ${'status-unknown'}
    `('should show "$label" when $free is free', async ({ free, label, className }) => {
      await render({ ...systemStatus, memory: { ...systemStatus.memory, free } });

      expect(statusLabel(0)).toContain(label);
      expect(statusIcon(0).classList).toContain(className);
    });
  });

  describe('swap status', () => {
    it.each`
      used          | label                                      | className
      ${'0 MiB'}    | ${'Nominal'}                               | ${'status-good'}
      ${'1 MiB'}    | ${'Some swap used but safe'}               | ${'status-warning'}
      ${'30 MiB'}   | ${'Some swap used but safe'}               | ${'status-warning'}
      ${'31 MiB'}   | ${'Warning! this can bottleneck your cpu'} | ${'status-risk'}
      ${'1.00 GiB'} | ${NOT_AVAILABLE}                           | ${'status-unknown'}
    `('should show "$label" when $used is used', async ({ used, label, className }) => {
      await render({ ...systemStatus, swap: { used } });

      expect(statusLabel(1)).toContain(label);
      expect(statusIcon(1).classList).toContain(className);
    });
  });

  describe('cpu status', () => {
    it.each`
      temperature | label                     | className
      ${49}       | ${'Nominal'}              | ${'status-good'}
      ${50}       | ${'Warm but Safe'}        | ${'status-warning'}
      ${64}       | ${'Warm but Safe'}        | ${'status-warning'}
      ${65}       | ${'Warning! Overheating'} | ${'status-risk'}
    `('should show "$label" at $temperature degrees', async ({ temperature, label, className }) => {
      await render({ ...systemStatus, cpu: { temperature } });

      expect(statusLabel(2)).toContain(label);
      expect(statusIcon(2).classList).toContain(className);
    });
  });
});
