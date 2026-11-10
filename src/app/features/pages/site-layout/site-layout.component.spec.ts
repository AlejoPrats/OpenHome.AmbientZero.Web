import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideTaiga } from '@taiga-ui/core';
import { vi } from 'vitest';

import { SiteLayoutComponent } from './site-layout.component';
import { getTranslationModuleMock } from 'app/shared/mocks/translation-module.mock';
import { ThemeService } from 'app/core/services/theme.service';

@Component({ template: '' })
class EmptyPageComponent {}

describe('SiteLayout', () => {
  let component: SiteLayoutComponent;
  let fixture: ComponentFixture<SiteLayoutComponent>;
  let element: HTMLElement;
  let router: Router;
  let themeService: ThemeService;

  const menuToggle = () => element.querySelector<HTMLButtonElement>('#nav-menu-toggle')!;
  const menu = () => element.querySelector<HTMLElement>('#nav-menu')!;
  const themeOptions = () =>
    Array.from(
      element.querySelectorAll<HTMLButtonElement>('tui-tabs[appearance="segmented"] button'),
    );

  const openMenu = async () => {
    menuToggle().click();
    await fixture.whenStable();
  };

  beforeEach(async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [SiteLayoutComponent, getTranslationModuleMock()],
      providers: [
        provideRouter([
          { path: 'chart', component: EmptyPageComponent },
          { path: 'list', component: EmptyPageComponent },
        ]),
        provideTaiga(),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    themeService = TestBed.inject(ThemeService);
    fixture = TestBed.createComponent(SiteLayoutComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    delete (window as unknown as Record<string, unknown>)['matchMedia'];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should keep the ids the tour highlights on the navigation items', () => {
    const ids = Array.from(element.querySelectorAll('[tuiAsideItem][id]'), (item) => item.id);

    expect(ids).toEqual([
      'nav-temperature-chart',
      'nav-sensors',
      'nav-basic-settings',
      'nav-advanced-settings',
      'nav-help',
    ]);
  });

  it('should start with the menu closed', () => {
    expect(menuToggle().getAttribute('aria-expanded')).toBe('false');
    expect(menu().classList).not.toContain('open');
  });

  it('should open the menu when the toggle is pressed', async () => {
    await openMenu();

    expect(menuToggle().getAttribute('aria-expanded')).toBe('true');
    expect(menu().classList).toContain('open');
  });

  it('should close the menu when the toggle is pressed again', async () => {
    await openMenu();

    menuToggle().click();
    await fixture.whenStable();

    expect(menu().classList).not.toContain('open');
  });

  it('should close the menu when Escape is pressed', async () => {
    await openMenu();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fixture.whenStable();

    expect(menu().classList).not.toContain('open');
  });

  it('should close the menu when a navigation link is clicked', async () => {
    await openMenu();

    element.querySelector<HTMLAnchorElement>('#nav-sensors')!.click();
    await fixture.whenStable();

    expect(menu().classList).not.toContain('open');
  });

  it('should close the menu after navigating', async () => {
    await openMenu();

    await router.navigateByUrl('/chart');
    await fixture.whenStable();

    expect(menu().classList).not.toContain('open');
  });

  it('should mark the link of the current page', async () => {
    await router.navigateByUrl('/list');
    await fixture.whenStable();

    const current = element.querySelector('[aria-current="page"]');

    expect(current?.id).toBe('nav-sensors');
  });

  it.each`
    index | mode
    ${0}  | ${'light'}
    ${1}  | ${'auto'}
    ${2}  | ${'dark'}
  `('should switch to the $mode theme when its option is pressed', async ({ index, mode }) => {
    themeOptions()[index].click();
    await fixture.whenStable();

    expect(themeService.mode()).toBe(mode);
  });
});
