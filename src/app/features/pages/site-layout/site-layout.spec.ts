import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteLayout } from './site-layout';

describe('SiteLayout', () => {
  let component: SiteLayout;
  let fixture: ComponentFixture<SiteLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(SiteLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
