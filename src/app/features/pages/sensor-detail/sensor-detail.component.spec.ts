import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorDetailComponent } from './sensor-detail.component';

describe('SensorDetailComponent', () => {
  let component: SensorDetailComponent;
  let fixture: ComponentFixture<SensorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SensorDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
