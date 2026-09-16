import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceUpdateModalComponent } from './force-update-modal.component';

describe('ForceUpdateModalComponent', () => {
  let component: ForceUpdateModalComponent;
  let fixture: ComponentFixture<ForceUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForceUpdateModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ForceUpdateModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
