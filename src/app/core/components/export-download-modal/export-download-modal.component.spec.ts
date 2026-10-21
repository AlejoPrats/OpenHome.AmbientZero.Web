import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportDownloadModalComponent } from './export-download-modal.component';

describe('ExportDownloadModalComponent', () => {
  let component: ExportDownloadModalComponent;
  let fixture: ComponentFixture<ExportDownloadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportDownloadModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportDownloadModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
