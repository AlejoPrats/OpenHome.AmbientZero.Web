import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportUploadModalComponent } from './import-upload-modal.component';

describe('ImportUploadModalComponent', () => {
  let component: ImportUploadModalComponent;
  let fixture: ComponentFixture<ImportUploadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportUploadModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportUploadModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
