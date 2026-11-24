import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Translation, TranslocoService, TranslocoTestingModule } from '@jsverse/transloco';
import { TuiResponsiveDialogService } from '@taiga-ui/addon-mobile';
import { driver } from 'driver.js';
import { of, Subject } from 'rxjs';

import { OnboardingSetupService } from 'app/shared/services/onboarding-setup.service';
import { OnboardingService } from './driver.service';

vi.mock(import('driver.js'), () => ({
  driver: vi.fn(() => ({ drive: vi.fn() }) as unknown as ReturnType<typeof driver>),
}));

describe('OnboardingService', () => {
  let service: OnboardingService;
  let tourTranslations: Subject<Translation>;
  let selectTranslation: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      callback(0);
      return 0;
    });
    tourTranslations = new Subject<Translation>();

    TestBed.configureTestingModule({
      imports: [TranslocoTestingModule.forRoot({ langs: { en: {}, es: {} } })],
      providers: [
        provideRouter([]),
        { provide: Router, useValue: { navigate: vi.fn() } },
        { provide: OnboardingSetupService, useValue: {} },
        { provide: TuiResponsiveDialogService, useValue: { open: vi.fn(() => of(false)) } },
      ],
    });
    selectTranslation = vi
      .spyOn(TestBed.inject(TranslocoService), 'selectTranslation')
      .mockReturnValue(tourTranslations);
    service = TestBed.inject(OnboardingService);
  });

  afterEach(() => {
    vi.mocked(driver).mockClear();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('on initialize', () => {
    it('should load the tour translations for the active language', () => {
      expect(selectTranslation).toHaveBeenCalledWith('onboarding/en');
    });

    it('should listen for the tour translations until they are loaded', () => {
      expect(tourTranslations.observed).toBe(true);
    });

    it('should stop listening once the tour translations are loaded', () => {
      tourTranslations.next({ next: 'Next' });

      expect(tourTranslations.observed).toBe(false);
    });
  });

  describe('start', () => {
    beforeEach(() => {
      service.addStepCollection([{ title: 'help-nav', description: 'help-nav-desc' }]);
    });

    it('should not start the tour before its translations are loaded', async () => {
      service.start();
      await vi.advanceTimersByTimeAsync(500);

      expect(driver).not.toHaveBeenCalled();
    });

    it('should start the tour once its translations are loaded', async () => {
      service.start();
      await vi.advanceTimersByTimeAsync(500);

      tourTranslations.next({ next: 'Next' });
      await vi.advanceTimersByTimeAsync(100);

      expect(driver).toHaveBeenCalledTimes(1);
    });
  });
});
