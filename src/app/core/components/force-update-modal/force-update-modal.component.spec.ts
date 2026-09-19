import { ComponentFixture, TestBed } from '@angular/core/testing';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { of } from 'rxjs';

import { NotificationService } from 'app/core/services/notification-service.service';
import { VersionService } from 'app/shared/services/version.service';
import { ForceUpdateModalComponent } from './force-update-modal.component';

describe('ForceUpdateModalComponent', () => {
  let component: ForceUpdateModalComponent;
  let fixture: ComponentFixture<ForceUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForceUpdateModalComponent],
      providers: [
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: {
            data: 'test-module',
            $implicit: { next: () => undefined, complete: () => undefined },
          },
        },
        { provide: VersionService, useValue: { uploadFile: vi.fn(() => of(undefined)) } },
        { provide: NotificationService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ForceUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
