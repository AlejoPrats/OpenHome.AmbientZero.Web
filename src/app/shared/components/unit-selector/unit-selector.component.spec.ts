import { ComponentFixture, TestBed } from '@angular/core/testing';

import { getTranslationModuleMock } from 'app/shared/mocks/translation-module.mock';
import { UnitSelectorComponent } from './unit-selector.component';

describe('UnitSelectorComponent', () => {
  let component: UnitSelectorComponent;
  let fixture: ComponentFixture<UnitSelectorComponent>;

  const getUnitInput = () =>
    (fixture.nativeElement as HTMLElement).querySelector<HTMLInputElement>('input')!;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitSelectorComponent, getTranslationModuleMock()],
    }).compileComponents();

    fixture = TestBed.createComponent(UnitSelectorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the unit selector placeholder', () => {
    expect(getUnitInput().placeholder).toContain('unitSelector.select-a-unit');
  });
});
