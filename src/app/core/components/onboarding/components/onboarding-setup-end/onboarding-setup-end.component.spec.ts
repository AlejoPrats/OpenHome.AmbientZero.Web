import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { TuiNotificationService } from '@taiga-ui/core';
import { of } from 'rxjs';

import { OnboardingSetupService } from 'app/shared/services/onboarding-setup.service';
import { OnboardingSetupEndComponent } from './onboarding-setup-end.component';
import { OnboardingService } from '../../services/driver.service';

describe('OnboardingSetupEndComponent', () => {
  let component: OnboardingSetupEndComponent;
  let fixture: ComponentFixture<OnboardingSetupEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OnboardingSetupEndComponent,
        TranslocoTestingModule.forRoot({ langs: { en: {}, es: {} } }),
      ],
      providers: [
        { provide: OnboardingService, useValue: { nextStep: vi.fn(), previousStep: vi.fn() } },
        { provide: OnboardingSetupService, useValue: { finishOnboardingSetup: vi.fn(() => of()) } },
        { provide: TuiNotificationService, useValue: { open: vi.fn(() => of(undefined)) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingSetupEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
