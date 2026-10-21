import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SensorListComponent } from './sensor-list.component';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { getTranslationModuleMock } from 'app/shared/mocks/translation-module.mock';

describe('SensorList', () => {
  let component: SensorListComponent;
  let fixture: ComponentFixture<SensorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorListComponent, getTranslationModuleMock()],
      providers: [
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: {
            data: false,
            $implicit: { next: () => undefined, complete: () => undefined },
          },
        },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SensorListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
