import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportModalComponent } from './import-modal.component';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';

describe('ImportModalComponent', () => {
  let component: ImportModalComponent;
  let fixture: ComponentFixture<ImportModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: {
            data: false,
            $implicit: { next: () => undefined, complete: () => undefined },
          },
        },
      ],
      imports: [ImportModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
