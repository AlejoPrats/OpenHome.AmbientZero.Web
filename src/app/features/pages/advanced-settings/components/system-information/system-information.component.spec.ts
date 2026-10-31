import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceStatusResult } from 'app/shared/interfaces/device-status-result';
import { getTranslationModuleMock } from 'app/shared/mocks/translation-module.mock';
import { SystemInformationComponent } from './system-information.component';

const NOT_AVAILABLE = 'not-available';
const RAM_CARD_POSITION = 0;
const SWAP_CARD_POSITION = 1;
const CPU_CARD_POSITION = 2;
const CARD_COUNT = 3;

describe('SystemInformationComponent', () => {
  let component: SystemInformationComponent;
  let fixture: ComponentFixture<SystemInformationComponent>;
  let systemStatus: DeviceStatusResult;

  const getCards = () =>
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('section.card');

  const getCard = (cardPosition: number) => getCards()[cardPosition];

  const getStatusIcon = (cardPosition: number) =>
    getCard(cardPosition).querySelector('.brief-status tui-icon')!;

  const getStatusLabel = (cardPosition: number) =>
    getCard(cardPosition)
      .querySelector('.brief-status [tuiTitle] > div:last-child')!
      .textContent!.trim();

  const getCardValues = (cardPosition: number) =>
    Array.from(getCard(cardPosition).querySelectorAll('.cell-field'), (cell) =>
      cell.textContent!.trim(),
    );

  const renderComponent = async (data: DeviceStatusResult | null) => {
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
    await renderComponent(systemStatus);

    expect(component).toBeTruthy();
  });

  describe('when the system information is available', () => {
    beforeEach(async () => {
      await renderComponent(systemStatus);
    });

    it.each`
      resource  | cardPosition          | values
      ${'ram'}  | ${RAM_CARD_POSITION}  | ${['512 MiB', '100 MiB']}
      ${'swap'} | ${SWAP_CARD_POSITION} | ${['0 MiB']}
      ${'cpu'}  | ${CPU_CARD_POSITION}  | ${['45']}
    `('should show the $resource values', ({ cardPosition, values }) => {
      expect(getCardValues(cardPosition)).toEqual(values);
    });

    it.each`
      resource  | cardPosition
      ${'ram'}  | ${RAM_CARD_POSITION}
      ${'swap'} | ${SWAP_CARD_POSITION}
      ${'cpu'}  | ${CPU_CARD_POSITION}
    `('should show the $resource status as nominal', ({ cardPosition }) => {
      expect(getStatusLabel(cardPosition)).toBe('Nominal');
    });
  });

  describe('when the system information is not available', () => {
    beforeEach(async () => {
      await renderComponent(null);
    });

    it('should still show the system status cards', () => {
      expect(getCards()).toHaveLength(CARD_COUNT);
    });

    it.each`
      resource  | cardPosition
      ${'ram'}  | ${RAM_CARD_POSITION}
      ${'swap'} | ${SWAP_CARD_POSITION}
      ${'cpu'}  | ${CPU_CARD_POSITION}
    `('should show the $resource status and values as not available', ({ cardPosition }) => {
      expect(getStatusLabel(cardPosition)).toContain(NOT_AVAILABLE);
      expect(getCardValues(cardPosition).every((value) => value.includes(NOT_AVAILABLE))).toBe(
        true,
      );
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
      await renderComponent({ ...systemStatus, memory: { ...systemStatus.memory, free } });

      expect(getStatusLabel(RAM_CARD_POSITION)).toContain(label);
      expect(getStatusIcon(RAM_CARD_POSITION).classList).toContain(className);
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
      await renderComponent({ ...systemStatus, swap: { used } });

      expect(getStatusLabel(SWAP_CARD_POSITION)).toContain(label);
      expect(getStatusIcon(SWAP_CARD_POSITION).classList).toContain(className);
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
      await renderComponent({ ...systemStatus, cpu: { temperature } });

      expect(getStatusLabel(CPU_CARD_POSITION)).toContain(label);
      expect(getStatusIcon(CPU_CARD_POSITION).classList).toContain(className);
    });
  });
});
