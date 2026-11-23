import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TuiSegmented } from '@taiga-ui/kit';
import { ThemeSwitcherComponent } from './theme-switcher.component';
import { ThemeService } from 'app/core/services/theme.service';

describe('ThemeSwitcherComponent', () => {
  let component: ThemeSwitcherComponent;
  let fixture: ComponentFixture<ThemeSwitcherComponent>;
  let element: HTMLElement;
  let themeService: ThemeService;

  const option = (label: string) =>
    element.querySelector<HTMLButtonElement>(`button[aria-label="${label} theme"]`)!;

  const selectedIndex = () =>
    fixture.debugElement.query(By.directive(TuiSegmented)).componentInstance.activeItemIndex();

  const createComponent = async () => {
    fixture = TestBed.createComponent(ThemeSwitcherComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    themeService = TestBed.inject(ThemeService);
    await fixture.whenStable();
  };

  beforeEach(async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    });
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [ThemeSwitcherComponent],
    }).compileComponents();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', async () => {
    await createComponent();

    expect(component).toBeTruthy();
  });

  it.each`
    label       | mode
    ${'Light'}  | ${'light'}
    ${'System'} | ${'auto'}
    ${'Dark'}   | ${'dark'}
  `('should switch to the $mode theme when $label is pressed', async ({ label, mode }) => {
    await createComponent();

    option(label).click();
    await fixture.whenStable();

    expect(themeService.mode()).toBe(mode);
  });

  it('should highlight the theme picked in a previous visit', async () => {
    localStorage.setItem('theme', 'dark');

    await createComponent();

    expect(selectedIndex()).toBe(2);
  });
});
