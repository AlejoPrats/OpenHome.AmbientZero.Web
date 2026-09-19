import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { TuiNotificationService } from '@taiga-ui/core';
import { of } from 'rxjs';

import { OnboardingSetupService } from 'app/shared/services/onboarding-setup.service';
import { OnboardingLanguageSelectorComponent } from './onboarding-language-selector.component';
import { OnboardingService } from '../../services/driver.service';

describe('OnboardingLanguageSelectorComponent', () => {
  let component: OnboardingLanguageSelectorComponent;
  let fixture: ComponentFixture<OnboardingLanguageSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OnboardingLanguageSelectorComponent,
        TranslocoTestingModule.forRoot({ langs: { en: {}, es: {} } }),
      ],
      providers: [
        { provide: OnboardingService, useValue: { nextStep: vi.fn(), previousStep: vi.fn() } },
        { provide: OnboardingSetupService, useValue: { setLanguage: vi.fn(() => of()) } },
        { provide: TuiNotificationService, useValue: { open: vi.fn(() => of(undefined)) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingLanguageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
