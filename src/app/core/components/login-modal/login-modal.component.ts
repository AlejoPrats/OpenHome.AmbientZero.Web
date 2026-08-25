import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiAutoFocus } from '@taiga-ui/cdk';
import { TuiButton, TuiDialog, TuiDialogContext, TuiInput, TuiNotificationService, TuiTextfieldComponent } from "@taiga-ui/core";
import { TuiForm } from '@taiga-ui/layout';
import { injectContext } from '@taiga-ui/polymorpheus';
import { AuthService } from '../../../shared/services/auth.service';
import { LoginRequest } from '../../../shared/models/login-request';
import { LocalStorageService } from '../../services/local-storage.service';
import { TimerService } from '../../services/timer.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-login-modal',
  imports: [FormsModule, TuiAutoFocus, TuiButton, TuiForm, TuiInput, DecimalPipe],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.less',
})
export class LoginModalComponent {
  protected readonly context = injectContext<TuiDialogContext<boolean, boolean>>();
  private readonly authService = inject(AuthService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly notificationService = inject(TuiNotificationService);
  protected readonly timerService = inject(TimerService);

  protected username: string = '';
  protected password: string = '';
  protected value = this.context.data;

  ngOnInit() {
    setInterval(() => this.cdr.markForCheck(), 1000);
  }

  login() {
    this.authService.login(new LoginRequest(this.username, this.password)).subscribe({
      next: (result) => {
        this.localStorageService.setAuthenticationToken(result!.token);
        this.context.$implicit.next(true);
        this.timerService.clearTimer('login');
        this.localStorageService.clearLoginAttempts();
        this.notificationService.open('Login Succesful', { label: 'Access Granted', appearance: 'positive', block: 'end', inline: 'end', autoClose: 5000 }).subscribe();
        this.context.$implicit.complete();
      },
      error: () => {
        const attempts = this.localStorageService.getLoginAttempts() + 1;
        this.localStorageService.setLoginAttempts(attempts);
        this.notificationService.open('Username Or Password Incorrect', { label: 'Login failed', appearance: 'negative', block: 'end', inline: 'end', autoClose: 5000 }).subscribe();
        if (attempts >= 5) {
          this.timerService.setTimer('login', 5 * 60_000); // 5 minutes
          this.localStorageService.clearLoginAttempts();    // reset counter
        }
      }
    });
  }
}
