import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockInstance, vi } from 'vitest';

import { IconComponent } from './icon.component';
import { IconName } from './icon-name.enum';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  let windowOpenSpy: MockInstance;

  beforeEach(async () => {
    windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

    await TestBed.configureTestingModule({
      imports: [IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    windowOpenSpy.mockRestore();
  });

  describe('on initialize', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Icon mapping', () => {
    it.each`
      iconName                   | expectedTuiString
      ${IconName.Edit}           | ${'@tui.pencil'}
      ${IconName.Add}            | ${'@tui.plus'}
      ${IconName.Delete}         | ${'@tui.trash'}
      ${IconName.Save}           | ${'@tui.save'}
      ${IconName.X}              | ${'@tui.x'}
      ${IconName.ArrowBigUpDash} | ${'@tui.arrow-big-up-dash'}
    `('should accept $iconName as input', ({ iconName }) => {
      fixture.componentRef.setInput('name', iconName);
      fixture.detectChanges();

      expect(component.name()).toBe(iconName);
    });
  });

  describe('Rendering', () => {
    it('should render icon element', () => {
      fixture.componentRef.setInput('name', IconName.Edit);
      fixture.detectChanges();

      const tuiIcon = fixture.debugElement.query(By.css('tui-icon'));
      expect(tuiIcon).toBeTruthy();
    });
  });

  describe('Size input', () => {
    it.each`
      size
      ${'small'}
      ${'medium'}
      ${'large'}
    `('should allow icon to have size $size', ({ size }) => {
      fixture.componentRef.setInput('name', IconName.Edit);
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();

      const tuiIcon = fixture.debugElement.query(By.css('tui-icon'));
      expect(tuiIcon.classes[size]).toBeTruthy();
    });

    it('should default to medium size when no size is provided', () => {
      fixture.componentRef.setInput('name', IconName.Edit);
      fixture.detectChanges();

      const tuiIcon = fixture.debugElement.query(By.css('tui-icon'));
      expect(tuiIcon.classes['medium']).toBeTruthy();
    });
  });

  describe('Navigation inputs', () => {
    it('should open URL in same tab when clicked with default target', () => {
      fixture.componentRef.setInput('name', IconName.Edit);
      fixture.componentRef.setInput('href', 'https://example.com');
      fixture.detectChanges();

      const tuiIcon = fixture.debugElement.query(By.css('tui-icon'));
      tuiIcon.nativeElement.click();

      expect(windowOpenSpy).toHaveBeenCalledWith('https://example.com', '_self');
    });

    it('should open URL in new tab when clicked with _blank target', () => {
      fixture.componentRef.setInput('name', IconName.Edit);
      fixture.componentRef.setInput('href', 'https://example.com');
      fixture.componentRef.setInput('target', '_blank');
      fixture.detectChanges();

      const tuiIcon = fixture.debugElement.query(By.css('tui-icon'));
      tuiIcon.nativeElement.click();

      expect(windowOpenSpy).toHaveBeenCalledWith('https://example.com', '_blank');
    });

    it('should not open URL when clicked without href', () => {
      fixture.componentRef.setInput('name', IconName.Edit);
      fixture.detectChanges();

      const tuiIcon = fixture.debugElement.query(By.css('tui-icon'));
      tuiIcon.nativeElement.click();

      expect(windowOpenSpy).not.toHaveBeenCalled();
    });

    it('should apply pointer class when href is provided', () => {
      fixture.componentRef.setInput('name', IconName.Edit);
      fixture.componentRef.setInput('href', 'https://example.com');
      fixture.detectChanges();

      const tuiIcon = fixture.debugElement.query(By.css('tui-icon'));
      expect(tuiIcon.classes['medium']).toBeTruthy();
      expect(tuiIcon.classes['pointer']).toBeTruthy();
    });

    it('should not apply pointer class when href is not provided', () => {
      fixture.componentRef.setInput('name', IconName.Edit);
      fixture.detectChanges();

      const tuiIcon = fixture.debugElement.query(By.css('tui-icon'));
      expect(tuiIcon.classes['medium']).toBeTruthy();
      expect(tuiIcon.classes['pointer']).toBeFalsy();
    });

    it('should combine size and pointer classes correctly', () => {
      fixture.componentRef.setInput('name', IconName.Edit);
      fixture.componentRef.setInput('size', 'large');
      fixture.componentRef.setInput('href', 'https://example.com');
      fixture.detectChanges();

      const tuiIcon = fixture.debugElement.query(By.css('tui-icon'));
      expect(tuiIcon.classes['large']).toBeTruthy();
      expect(tuiIcon.classes['pointer']).toBeTruthy();
      expect(tuiIcon.classes['medium']).toBeFalsy();
    });
  });
});
