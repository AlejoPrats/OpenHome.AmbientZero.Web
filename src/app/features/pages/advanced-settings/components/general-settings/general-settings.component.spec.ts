import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { VersionResponse } from 'app/shared/interfaces/version-response';
import { VersionService } from 'app/shared/services/version.service';
import { GeneralSettingsComponent } from './general-settings.component';

describe('GeneralSettingsComponent', () => {
  let component: GeneralSettingsComponent;
  let fixture: ComponentFixture<GeneralSettingsComponent>;

  const getVersionHeaders = () =>
    Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('.table-row.header .cell'),
      (cell) => cell.textContent!.trim(),
    );

  const renderComponent = async (versions: VersionResponse[]) => {
    TestBed.overrideProvider(VersionService, {
      useValue: { getVersions: vi.fn(() => of(versions)) },
    });
    fixture = TestBed.createComponent(GeneralSettingsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', {
      checkForUpdatesEnabled: true,
      automaticUpdatesEnabled: false,
      maxBatteryValue: 100,
      minBatteryValue: 0,
    });
    await fixture.whenStable();
  };

  const version = (localVersion: string, remoteVersion: string): VersionResponse => ({
    id: 'test-module-1',
    name: 'Test Module 1',
    localVersion,
    remoteVersion,
    lastUpdated: new Date('2026-01-01T00:00:00Z'),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralSettingsComponent],
      providers: [{ provide: VersionService, useValue: { getVersions: vi.fn(() => of([])) } }],
    }).compileComponents();
  });

  it('should create', async () => {
    await renderComponent([]);

    expect(component).toBeTruthy();
  });

  describe('update column', () => {
    it.each`
      localVersion | remoteVersion | action
      ${'1.9.0'}   | ${'1.10.0'}   | ${'show'}
      ${'1.0.0'}   | ${'1.0.1'}    | ${'show'}
      ${'1.10.0'}  | ${'1.9.0'}    | ${'hide'}
      ${'2.0.0'}   | ${'2.0.0'}    | ${'hide'}
    `(
      'should $action it when $localVersion is installed and $remoteVersion is available',
      async ({ localVersion, remoteVersion, action }) => {
        await renderComponent([version(localVersion, remoteVersion)]);

        expect(getVersionHeaders().includes('Update')).toBe(action === 'show');
      },
    );
  });
});
