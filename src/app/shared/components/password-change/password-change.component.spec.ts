import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChangeComponent } from './password-change.component';

describe('PasswordChangeComponent', () => {
  let component: PasswordChangeComponent;
  let fixture: ComponentFixture<PasswordChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordChangeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('minPasswordLength', 8);
    fixture.componentRef.setInput('isPasswordConfirmationEnabled', false);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
