import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportUploadModalComponent } from './import-upload-modal.component';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';

describe('ImportUploadModalComponent', () => {
  let component: ImportUploadModalComponent;
  let fixture: ComponentFixture<ImportUploadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportUploadModalComponent],
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

    fixture = TestBed.createComponent(ImportUploadModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
