import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpTreeComponent } from './help-tree.component';
import { IconName } from 'app/shared/components/icon/icon-name.enum';
import { HELP_IDENTIFIER } from 'app/core/constants/help-identifier.constants';

describe('HelpTreeComponent', () => {
  let component: HelpTreeComponent;
  let fixture: ComponentFixture<HelpTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpTreeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HelpTreeComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('treeData', [
      {
        identifier: HELP_IDENTIFIER.TEMPERATURE_CHART,
        text: 'Temperature Chart',
        icon: IconName.Chart,
        hasTour: true,
      },
    ]);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
