import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingAdminPasswordComponent } from './onboarding-admin-password.component';

describe('OnboardingAdminPasswordComponent', () => {
  let component: OnboardingAdminPasswordComponent;
  let fixture: ComponentFixture<OnboardingAdminPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingAdminPasswordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingAdminPasswordComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
