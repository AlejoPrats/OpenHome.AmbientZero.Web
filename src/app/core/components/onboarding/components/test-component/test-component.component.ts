import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, signal } from '@angular/core';
import { OnboardingService } from '../../services/driver.service';

@Component({
  selector: 'app-test-component',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './test-component.component.html',
  styleUrl: './test-component.component.less',
})
export class TestComponentComponent {
    value = signal(0);
    onboardService = inject(OnboardingService);

  constructor(private cdr: ChangeDetectorRef) {
    effect(() => {
      this.value(); // track signal
      this.cdr.detectChanges();
    });
  }

  sumOne()
  {
    this.value.set(this.value()+1);
    console.log("sumed one!");
    this.onboardService.nextStep();
  }
}
