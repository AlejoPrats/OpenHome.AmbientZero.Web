import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingTimezoneSelectorComponent } from './onboarding-timezone-selector.component';

describe('OnboardingTimezoneSelectorComponent', () => {
  let component: OnboardingTimezoneSelectorComponent;
  let fixture: ComponentFixture<OnboardingTimezoneSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingTimezoneSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingTimezoneSelectorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
