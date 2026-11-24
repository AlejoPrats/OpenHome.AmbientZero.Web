import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { provideTaiga, TuiNotificationService } from '@taiga-ui/core';

import { AuthService } from 'app/shared/services/auth.service';
import { LoginModalComponent } from './login-modal.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('LoginModalComponent', () => {
  let component: LoginModalComponent;
  let fixture: ComponentFixture<LoginModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginModalComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideTaiga(),
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: {
            data: false,
            $implicit: { next: () => undefined, complete: () => undefined },
          },
        },
        { provide: AuthService, useValue: { login: vi.fn(() => of(null)) } },
        {
          provide: TuiNotificationService,
          useValue: { open: vi.fn(() => of(undefined)) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
