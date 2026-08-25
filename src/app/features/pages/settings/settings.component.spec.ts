import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SettingsComponent } from './settings.component';

describe('Settings', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    const mockActivatedRoute = {
      data: of({
        timeZones: [{ id: 'UTC', name: 'UTC' }],
        applicationSettings: [{ settingName: 'TemperatureSetting', settingValue: '1' }],
      }),
    };

    await TestBed.configureTestingModule({
      imports: [SettingsComponent],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
