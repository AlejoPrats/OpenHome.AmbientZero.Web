import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TuiNotificationService } from '@taiga-ui/core';
import { TuiResponsiveDialogService } from '@taiga-ui/addon-mobile';
import { of } from 'rxjs';
import { TranslocoTestingModule } from '@jsverse/transloco';

import { AdvancedSettingsService } from 'app/shared/services/advanced-settings.service';
import { VersionService } from 'app/shared/services/version.service';
import { AdvancedSettingsComponent } from './advanced-settings.component';

describe('AdvancedSettingsComponent', () => {
  let component: AdvancedSettingsComponent;
  let fixture: ComponentFixture<AdvancedSettingsComponent>;

  beforeEach(async () => {
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    );

    await TestBed.configureTestingModule({
      imports: [
        AdvancedSettingsComponent,
        TranslocoTestingModule.forRoot({ langs: { en: {}, es: {} } }),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              advancedSettings: {
                generalSettings: {
                  checkForUpdatesEnabled: true,
                  automaticUpdatesEnabled: false,
                  maxBatteryValue: 100,
                  minBatteryValue: 0,
                },
                accessPointSettings: {
                  accessPointName: 'test-network',
                  accessPointPassword: 'test-password',
                  accessPointSecurity: 0,
                },
                applicationSecurity: { applicationSecurity: 0, sshPassword: '' },
              },
            }),
          },
        },
        { provide: VersionService, useValue: { getVersions: vi.fn(() => of([])) } },
        { provide: AdvancedSettingsService, useValue: {} },
        {
          provide: TuiResponsiveDialogService,
          useValue: { open: vi.fn(() => of(undefined)) },
        },
        { provide: TuiNotificationService, useValue: { open: vi.fn(() => of(undefined)) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdvancedSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    fixture.destroy();
    vi.unstubAllGlobals();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
