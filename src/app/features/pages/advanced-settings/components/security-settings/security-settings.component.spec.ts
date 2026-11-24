import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritySettingsComponent } from './security-settings.component';

describe('SecuritySettingsComponent', () => {
  let component: SecuritySettingsComponent;
  let fixture: ComponentFixture<SecuritySettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecuritySettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SecuritySettingsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', {
      applicationSecurity: 0,
      sshPassword: 'test-password',
    });
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
