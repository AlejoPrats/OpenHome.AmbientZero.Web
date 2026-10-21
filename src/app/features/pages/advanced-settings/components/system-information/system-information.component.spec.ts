import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemInformationComponent } from './system-information.component';

describe('SystemInformationComponent', () => {
  let component: SystemInformationComponent;
  let fixture: ComponentFixture<SystemInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemInformationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SystemInformationComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'data',
      //TODO: move to a real mock
      { memory: { free: '100 MiB' }, swap: { used: '0' }, cpu: { temperature: '10' } },
    );
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
