
import { isPlatformServer, NgClass } from '@angular/common';
import { Component, computed, inject, input, PLATFORM_ID } from '@angular/core';
import { TuiProgress } from '@taiga-ui/kit';

@Component({
  selector: 'app-password-strength',
  imports: [TuiProgress, NgClass],
  templateUrl: './password-strength.component.html',
  styleUrl: './password-strength.component.less',
})
export class PasswordStrengthComponent {
  private readonly animationDisabled = isPlatformServer(inject(PLATFORM_ID));

  protected readonly colors = [
    'var(--tui-chart-categorical-01)',
    'var(--tui-chart-categorical-21)',
    'lightskyblue',
    '#3682db',
    'var(--tui-background-accent-1)',
  ];

  passwordInput = input.required<string | undefined>();
  minPasswordLength = input.required<number>();
  strengthLabel = computed(() => this.getStrengthLabel(this.score()));
  protected score = computed(() => this.passwordInput() ? this.evaluate(this.passwordInput()!) : -1);


  getStrengthLabel(score: number): 'Weak 😟' | 'Normal 🙂' | 'Strong 😎' {
    if (score < 40) return 'Weak 😟';
    if (score < 80) return 'Normal 🙂';
    return 'Strong 😎';
  }

  evaluate(pwd: string): number {
    if (pwd.length < 8) return 0;

    let score = 0;

    if (pwd.length >= 8) score += 20;
    if (pwd.length >= 11) score += 35;
    if (pwd.length >= 15) score += 50;
    if (pwd.length > 20) score += 60;

    // Variety scoring (0–40)
    if (/[a-z]/.test(pwd)) score += 10;
    if (/[A-Z]/.test(pwd)) score += 10;
    if (/\d/.test(pwd)) score += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 10;

    return Math.min(100, score);
  }
}
