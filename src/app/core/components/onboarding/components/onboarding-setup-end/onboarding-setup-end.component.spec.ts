import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingSetupEndComponent } from './onboarding-setup-end.component';

describe('OnboardingSetupEndComponent', () => {
  let component: OnboardingSetupEndComponent;
  let fixture: ComponentFixture<OnboardingSetupEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingSetupEndComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingSetupEndComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
