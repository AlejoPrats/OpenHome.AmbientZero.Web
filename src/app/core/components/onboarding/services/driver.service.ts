import { ApplicationRef, createComponent, EnvironmentInjector, inject, Injectable, NgZone, Type } from '@angular/core';
import { driver } from "driver.js";
import { TranslocoService } from '@jsverse/transloco';
import { filter, Observable, switchMap } from 'rxjs';
import { OnboardingStep } from '../models/onboarding-step';
import { Router } from '@angular/router';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { TuiResponsiveDialogService } from '@taiga-ui/addon-mobile';
import { TUI_CONFIRM, TuiConfirmData } from '@taiga-ui/kit';
import { OnboardingSetupEndComponent } from '../components/onboarding-setup-end/onboarding-setup-end.component';
import { OnboardingSetupService } from 'app/shared/services/onboarding-setup.service';

@Injectable({ providedIn: 'root' })
export class OnboardingService {
  private driver: any;
  private route = inject(Router);
  private injector = inject(EnvironmentInjector);
  private transloco = inject(TranslocoService);
  private localStorageService = inject(LocalStorageService);
  private isTranslationLoaded = false;
  private Steps: OnboardingStep[] = [];
  private dialogs = inject(TuiResponsiveDialogService);
  private onboardingSetupService = inject(OnboardingSetupService)

  getScopedTranslations(scope: string): Observable<any> {
    return this.transloco.selectTranslate<any>('', {}, { scope: scope }, true).pipe(
      filter(translations => translations && Object.keys(translations).length > 0)
    );
  }

  t(key: string) {
    return this.transloco.translate(key, {}, 'onboarding');
  }

  constructor(private appRef: ApplicationRef) {
    console.log("constructor");
    this.getScopedTranslations(`onboarding/${this.transloco.getActiveLang()}`).subscribe({
      next: () => {
        this.isTranslationLoaded = true;
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

  async start() {
    requestAnimationFrame(async () => {
      while (
        !this.isTranslationLoaded ||
        this.Steps.length === 0) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      this.driver = driver({
        animate: true,
        allowClose: false,
        doneBtnText: this.t('finish'),
        nextBtnText: this.t('next'),
        prevBtnText: this.t('back'),
        steps: this.Steps.map(s => ({
          element: s.element ?? 'placeholder',
          disableActiveInteraction: !s.canInteract,
          popover: {
            onPopoverRender: (popoverElement, step) => {
              if (s.navigateTo) {
                if (s.data) {
                  this.localStorageService.setOnboardingTourDataMode(true);
                  this.localStorageService.setOnboardingTourData(s.data);
                }

                this.route.navigate([s.navigateTo])
              }

              if (s.shouldClick) {
                (step.driver.getActiveElement() as HTMLElement).click();
              }

              if (this.localStorageService.getOnboardingRunning()
                && !this.localStorageService.getOnboaringSetupStatus()) {
                const button = document.createElement('button');
                button.textContent = 'Skip Tour';
                button.className = 'onboarding-popover-footer-button';

                button.onclick = () => {
                  const confirmDialog: TuiConfirmData = {
                    content: 'You can skip the tour and re-take it at any time from the basic settings section',
                    yes: 'Yes',
                    no: 'No'
                  };

                  this.localStorageService.setOnboardingStep(step.driver.getActiveIndex()!);
                  step.driver.destroy();

                  this.dialogs.open<boolean>(TUI_CONFIRM, {
                    label: 'Skip Tour?',
                    size: 's',
                    data: confirmDialog
                  }).subscribe({
                    next: (result) => {
                      if (result) {
                        this.onboardingSetupService.finishOnboardingTour().subscribe({
                          next: () => {
                            this.localStorageService.finishTourAndCleanStorage();
                          }
                        });
                      }
                      else {
                        this.driver.drive(this.localStorageService.getOnboardingStep())
                      }
                    }
                  });
                }

                const buttonFooter = document.getElementsByClassName('driver-popover-navigation-btns')[0] as HTMLElement;
                buttonFooter.append(button);
              }

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
            description: s.description ? this.t(s.description) : 'placeholder',
            position: s.position ?? 'bottom'
          },
          padding: s.padding ?? 10
        }))
      });

      this.driver.drive(this.localStorageService.getOnboardingStep());
    });
  }

  addStepCollection(stepsToAdd: OnboardingStep[]) {
    this.Steps.push(...stepsToAdd);
  }

  clearSteps() {
    this.Steps = [];
  }

  finishTour() {

  }
}
