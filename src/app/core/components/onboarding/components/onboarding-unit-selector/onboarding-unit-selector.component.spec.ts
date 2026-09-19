import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { TuiNotificationService } from '@taiga-ui/core';
import { of } from 'rxjs';

import { OnboardingSetupService } from 'app/shared/services/onboarding-setup.service';
import { OnboardingUnitSelectorComponent } from './onboarding-unit-selector.component';
import { OnboardingService } from '../../services/driver.service';

describe('OnboardingUnitSelectorComponent', () => {
  let component: OnboardingUnitSelectorComponent;
  let fixture: ComponentFixture<OnboardingUnitSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OnboardingUnitSelectorComponent,
        TranslocoTestingModule.forRoot({ langs: { en: {}, es: {} } }),
      ],
      providers: [
        { provide: OnboardingService, useValue: { nextStep: vi.fn(), previousStep: vi.fn() } },
        { provide: OnboardingSetupService, useValue: { setTemperatureUnit: vi.fn(() => of()) } },
        { provide: TuiNotificationService, useValue: { open: vi.fn(() => of(undefined)) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingUnitSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
