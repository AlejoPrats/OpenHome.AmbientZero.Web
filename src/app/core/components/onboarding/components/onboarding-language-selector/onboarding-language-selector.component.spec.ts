import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingLanguageSelectorComponent } from './onboarding-language-selector.component';

describe('OnboardingLanguageSelectorComponent', () => {
  let component: OnboardingLanguageSelectorComponent;
  let fixture: ComponentFixture<OnboardingLanguageSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingLanguageSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingLanguageSelectorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
