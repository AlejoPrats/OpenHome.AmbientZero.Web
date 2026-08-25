import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingUnitSelectorComponent } from './onboarding-unit-selector.component';

describe('OnboardingUnitSelectorComponent', () => {
  let component: OnboardingUnitSelectorComponent;
  let fixture: ComponentFixture<OnboardingUnitSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingUnitSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingUnitSelectorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
