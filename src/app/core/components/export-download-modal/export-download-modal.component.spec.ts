import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportDownloadModalComponent } from './export-download-modal.component';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';

describe('ExportDownloadModalComponent', () => {
  let component: ExportDownloadModalComponent;
  let fixture: ComponentFixture<ExportDownloadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportDownloadModalComponent],
      providers: [
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: {
            data: false,
            $implicit: { next: () => undefined, complete: () => undefined },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportDownloadModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
