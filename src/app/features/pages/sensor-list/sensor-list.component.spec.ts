import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SensorListComponent } from './sensor-list';

describe('SensorList', () => {
  let component: SensorListComponent;
  let fixture: ComponentFixture<SensorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorListComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SensorListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
