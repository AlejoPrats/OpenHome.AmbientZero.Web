import { ApplicationRef, createComponent, EnvironmentInjector, inject, Injectable, Type } from '@angular/core';
import { driver } from "driver.js";
import { ONBOARDING_STEPS } from '../steps';
import { NavBarComponent } from 'app/shared/components/nav-bar/nav-bar.component';
import { TestComponentComponent } from '../components/test-component/test-component.component';
import { TranslocoService } from '@jsverse/transloco';
import { TranslocoHttpLoader } from 'app/transloco-loader';
import { filter, Observable, switchMap, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OnboardingService {
  private driver: any;
  private injector = inject(EnvironmentInjector);
  private transloco = inject(TranslocoService);
  private isTranslationLoaded = false;
  private isDriverInitialized = false;

  getScopedTranslations(scope: string): Observable<any> {
    return this.transloco.selectTranslate<any>('', {}, { scope: 'onboarding' }, true).pipe(
      // Ensure we don't accidentally grab an empty initialized object
      filter(translations => translations && Object.keys(translations).length > 0),
      // Automatically close and complete the stream as soon as the keys arrive
      take(1)
    );

  }

  t(key: string) {
    return this.transloco.translate(key, {}, 'onboarding');
  }

  constructor(private appRef: ApplicationRef) {
    this.getScopedTranslations('onboarding').subscribe({
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

    // Attach to Angular CD tree
    this.appRef.attachView(cmp.hostView);

    host.innerHTML = '';
    host.appendChild(cmp.location.nativeElement);

    // Initial render
    cmp.changeDetectorRef.detectChanges();
  }

  nextStep() {
    this.driver.moveNext();
  }

  previousStep() {
    this.driver.movePrevious();
  }

  async start() {
    while (!this.isTranslationLoaded || !this.isDriverInitialized) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    this.driver.drive();

  }
}
