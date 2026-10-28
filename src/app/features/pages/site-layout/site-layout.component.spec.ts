import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTaiga } from '@taiga-ui/core';
import { vi } from 'vitest';

import { SiteLayoutComponent } from './site-layout.component';

describe('SiteLayout', () => {
  let component: SiteLayoutComponent;
  let fixture: ComponentFixture<SiteLayoutComponent>;
  let matchMediaMock: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    matchMediaMock = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
      configurable: true,
    });

    await TestBed.configureTestingModule({
      imports: [SiteLayoutComponent],
      providers: [provideRouter([]), provideTaiga()],
    }).compileComponents();

    fixture = TestBed.createComponent(SiteLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete (window as unknown as Record<string, unknown>)['matchMedia'];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
