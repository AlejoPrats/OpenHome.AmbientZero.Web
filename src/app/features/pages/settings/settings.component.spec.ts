import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { of } from 'rxjs';

import { SystemService } from 'app/shared/services/system.service';
import { SettingsComponent } from './settings.component';

describe('Settings', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    const mockActivatedRoute = {
      data: of({
        timeZones: [{ id: 'UTC', name: 'UTC' }],
        applicationSettings: { timeZone: 'UTC', displayUnit: 0 },
      }),
    };

    await TestBed.configureTestingModule({
      imports: [SettingsComponent, TranslocoTestingModule.forRoot({ langs: { en: {}, es: {} } })],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        {
          provide: SystemService,
          useValue: { getTimeZones: vi.fn(() => of([{ id: 'UTC', name: 'UTC' }])) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
