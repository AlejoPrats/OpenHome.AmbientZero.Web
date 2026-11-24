import { ModuleWithProviders } from '@angular/core';

import { TranslocoTestingModule } from '@jsverse/transloco';

export function getTranslationModuleMock(): ModuleWithProviders<TranslocoTestingModule> {
  return TranslocoTestingModule.forRoot({ langs: { en: {} }, preloadLangs: false });
}
