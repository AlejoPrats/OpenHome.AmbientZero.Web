import { ApplicationRef, createComponent, EnvironmentInjector, inject, Injectable, Type } from '@angular/core';
import { driver } from "driver.js";
import { ONBOARDING_STEPS } from '../steps';
import { TranslocoService } from '@jsverse/transloco';
import { filter, Observable, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OnboardingService {
  private driver: any;
  private injector = inject(EnvironmentInjector);
  private transloco = inject(TranslocoService);
  private isTranslationLoaded = false;
  private isDriverInitialized = false;

  getScopedTranslations(scope: string): Observable<any> {
    console.log(`${scope}/${this.transloco.getActiveLang()}`);
    return this.transloco.selectTranslate<any>('', {}, { scope: scope }, true).pipe(
      filter(translations => translations && Object.keys(translations).length > 0)
    );
  }

  t(key: string) {
    return this.transloco.translate(key, {}, 'onboarding');
  }

  constructor(private appRef: ApplicationRef) {
    console.log(`onboarding/${this.transloco.getActiveLang()}`);
    this.getScopedTranslations(`onboarding/${this.transloco.getActiveLang()}`).subscribe({
      next: () => {
        this.isTranslationLoaded = true;
        this.driver = driver({
          animate: true,
          allowClose: false,
          doneBtnText: this.t('finish'),
          nextBtnText: this.t('next'),
          prevBtnText: this.t('back'),
          steps: ONBOARDING_STEPS.map(s => ({
            element: s.element,
            popover: {
              onPopoverRender: (popoverElement, step) => {
                console.log("it was refreshed");
                if (s.component) {
                  const desc = popoverElement.description; // already the DOM node
                  popoverElement.nextButton.style.display = 'none';
                  popoverElement.previousButton.style.display = 'none';
                  popoverElement.closeButton.style.display = 'none';
                  popoverElement.footer.style.display = 'none';

                  desc.innerHTML = '';

                  const host = document.createElement('div');
                  host.id = 'driver-angular-host';
                  desc.appendChild(host);
                  this.mountAngularComponent(s.component!, s.data);
                }
              },
              title: this.t(s.title),
              description: s.description,
              position: s.position ?? 'bottom'
            },
            padding: s.padding ?? 10
          }))
        });
        this.isDriverInitialized = true;
      }
    });
  }

  mountAngularComponent(component: Type<any>, data?: any) {
    const host = document.getElementById('driver-angular-host');
    if (!host) return;

    const cmp = createComponent(component, {
      environmentInjector: this.injector
    });

    if (data) {
      Object.assign(cmp.instance, data);
    }

    this.appRef.attachView(cmp.hostView);

    host.innerHTML = '';
    host.appendChild(cmp.location.nativeElement);

    cmp.changeDetectorRef.detectChanges();
  }

  nextStep() {
    this.driver.moveNext();
  }

  previousStep() {
    this.driver.movePrevious();
  }

  refreshPopOver() {
    this.driver.refresh();
  }

  async start() {
    while (!this.isTranslationLoaded || !this.isDriverInitialized) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    this.driver.drive();

  }
}
