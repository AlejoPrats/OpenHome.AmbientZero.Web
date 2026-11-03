import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { TuiNotificationService } from '@taiga-ui/core';
import { of } from 'rxjs';

import { OnboardingSetupService } from 'app/shared/services/onboarding-setup.service';
import { SystemService } from 'app/shared/services/system.service';
import { OnboardingTimezoneSelectorComponent } from './onboarding-timezone-selector.component';
import { OnboardingService } from '../../services/driver.service';

describe('OnboardingTimezoneSelectorComponent', () => {
  let component: OnboardingTimezoneSelectorComponent;
  let fixture: ComponentFixture<OnboardingTimezoneSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OnboardingTimezoneSelectorComponent,
        TranslocoTestingModule.forRoot({ langs: { en: {}, es: {} } }),
      ],
      providers: [
        { provide: OnboardingService, useValue: { nextStep: vi.fn(), previousStep: vi.fn() } },
        { provide: OnboardingSetupService, useValue: { setTimezone: vi.fn(() => of()) } },
        { provide: TuiNotificationService, useValue: { open: vi.fn(() => of(undefined)) } },
        {
          provide: SystemService,
          useValue: { getTimeZones: vi.fn(() => of([{ id: 'UTC', name: 'UTC' }])) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingTimezoneSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
