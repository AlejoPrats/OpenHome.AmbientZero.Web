import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { TuiResponsiveDialogService } from '@taiga-ui/addon-mobile';
import { of } from 'rxjs';

import { OnboardingSetupService } from 'app/shared/services/onboarding-setup.service';
import { OnboardingService } from './driver.service';

describe('OnboardingService', () => {
  let service: OnboardingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslocoTestingModule.forRoot({ langs: { en: {}, es: {} } })],
      providers: [
        provideRouter([]),
        { provide: Router, useValue: { navigate: vi.fn() } },
        { provide: OnboardingSetupService, useValue: {} },
        { provide: TuiResponsiveDialogService, useValue: { open: vi.fn(() => of(false)) } },
      ],
    });
    service = TestBed.inject(OnboardingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
