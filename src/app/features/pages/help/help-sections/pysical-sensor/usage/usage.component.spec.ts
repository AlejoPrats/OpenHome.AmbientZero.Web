import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageComponent } from './usage.component';

describe('UsageComponent', () => {
  let component: UsageComponent;
  let fixture: ComponentFixture<UsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
