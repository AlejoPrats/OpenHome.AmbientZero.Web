import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureChartComponent } from './temperature-chart.component';

describe('TemperatureChart', () => {
  let component: TemperatureChartComponent;
  let fixture: ComponentFixture<TemperatureChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemperatureChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TemperatureChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
