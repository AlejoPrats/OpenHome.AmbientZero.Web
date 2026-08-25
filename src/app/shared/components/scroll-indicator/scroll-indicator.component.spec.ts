import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollIndicatorComponent } from './scroll-indicator.component';

describe('ScrollIndicatorComponent', () => {
  let component: ScrollIndicatorComponent;
  let fixture: ComponentFixture<ScrollIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollIndicatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollIndicatorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
