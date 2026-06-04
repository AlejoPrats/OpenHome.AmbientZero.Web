import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiAutoFocus } from '@taiga-ui/cdk';
import { TuiButton, TuiDialog, TuiDialogContext, TuiInput, TuiNotificationService, TuiTextfieldComponent } from "@taiga-ui/core";
import { TuiForm } from '@taiga-ui/layout';
import { injectContext } from '@taiga-ui/polymorpheus';
import { AuthService } from '../../../shared/services/auth.service';
import { LoginRequest } from '../../../shared/models/login-request';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-login-modal',
  imports: [FormsModule, TuiAutoFocus, TuiButton, TuiForm, TuiInput],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.less',
})
export class LoginModalComponent {
  protected readonly context = injectContext<TuiDialogContext<boolean, boolean>>();
  private readonly authService = inject(AuthService);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly notificationService = inject(TuiNotificationService);
  
  protected username: string = '';
  protected password: string = '';
  protected value = this.context.data;

  login() {
    this.authService.login(new LoginRequest(this.username, this.password)).subscribe({
      next: (result) => {
        this.localStorageService.setAuthenticationToken(result!.token);
        this.context.$implicit.next(true);
        this.notificationService.open('Login Succesful', { label: 'Access Granted', appearance: 'positive', block: 'end', inline: 'end', autoClose: 5000 }).subscribe();
        this.context.$implicit.complete();
      }
    }

    )
  }
}
