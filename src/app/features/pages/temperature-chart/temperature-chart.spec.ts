import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureChart } from './temperature-chart';

describe('TemperatureChart', () => {
  let component: TemperatureChart;
  let fixture: ComponentFixture<TemperatureChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemperatureChart],
    }).compileComponents();

    fixture = TestBed.createComponent(TemperatureChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
