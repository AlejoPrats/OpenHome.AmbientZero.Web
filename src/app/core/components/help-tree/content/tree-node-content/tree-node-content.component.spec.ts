import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeNodeContentComponent } from './tree-node-content.component';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';

describe('TreeNodeContentComponent', () => {
  let component: TreeNodeContentComponent;
  let fixture: ComponentFixture<TreeNodeContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: {
            data: false,
            $implicit: { next: () => undefined, complete: () => undefined },
          },
        },
      ],
      imports: [TreeNodeContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TreeNodeContentComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
