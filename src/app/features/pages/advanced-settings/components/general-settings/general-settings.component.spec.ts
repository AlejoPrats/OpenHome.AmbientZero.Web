import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { VersionService } from 'app/shared/services/version.service';
import { GeneralSettingsComponent } from './general-settings.component';

describe('GeneralSettingsComponent', () => {
  let component: GeneralSettingsComponent;
  let fixture: ComponentFixture<GeneralSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralSettingsComponent],
      providers: [
        {
          provide: VersionService,
          useValue: { getVersions: vi.fn(() => of([])) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralSettingsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', {
      checkForUpdatesEnabled: true,
      automaticUpdatesEnabled: false,
      maxBatteryValue: 100,
      minBatteryValue: 0,
    });
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
