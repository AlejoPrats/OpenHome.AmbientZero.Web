import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';

import { UnitSelectorComponent } from './unit-selector.component';

describe('UnitSelectorComponent', () => {
  let component: UnitSelectorComponent;
  let fixture: ComponentFixture<UnitSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UnitSelectorComponent,
        TranslocoTestingModule.forRoot({ langs: { en: {}, es: {} } }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UnitSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
