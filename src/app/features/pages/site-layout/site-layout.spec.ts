import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTaiga } from '@taiga-ui/core';
import { vi } from 'vitest';

import { SiteLayout } from './site-layout';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
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

describe('SiteLayout', () => {
  let component: SiteLayout;
  let fixture: ComponentFixture<SiteLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteLayout],
      providers: [provideRouter([]), provideTaiga()],
    }).compileComponents();

    fixture = TestBed.createComponent(SiteLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
