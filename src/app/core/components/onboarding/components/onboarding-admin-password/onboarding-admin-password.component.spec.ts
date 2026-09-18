import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TuiNotificationService } from '@taiga-ui/core';
import { of } from 'rxjs';

import { OnboardingSetupService } from 'app/shared/services/onboarding-setup.service';
import { OnboardingAdminPasswordComponent } from './onboarding-admin-password.component';
import { OnboardingService } from '../../services/driver.service';

describe('OnboardingAdminPasswordComponent', () => {
  let component: OnboardingAdminPasswordComponent;
  let fixture: ComponentFixture<OnboardingAdminPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingAdminPasswordComponent],
      providers: [
        { provide: OnboardingService, useValue: { nextStep: vi.fn(), previousStep: vi.fn() } },
        { provide: OnboardingSetupService, useValue: { setAdminPassword: vi.fn(() => of()) } },
        { provide: TuiNotificationService, useValue: { open: vi.fn(() => of(undefined)) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingAdminPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
