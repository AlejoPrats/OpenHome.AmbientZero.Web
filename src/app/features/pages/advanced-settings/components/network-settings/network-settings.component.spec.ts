import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkSettingsComponent } from './network-settings.component';

describe('NetworkSettingsComponent', () => {
  let component: NetworkSettingsComponent;
  let fixture: ComponentFixture<NetworkSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NetworkSettingsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', {
      accessPointName: 'Test access point',
      accessPointPassword: 'test-password',
      accessPointSecurity: 1,
    });
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
