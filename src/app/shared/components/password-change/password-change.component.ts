import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiIcon, TuiInput } from '@taiga-ui/core';
import { TuiPassword } from '@taiga-ui/kit';
import { PasswordStrengthComponent } from '../password-strength/password-strength.component';
import { PasswordChangeResult } from './password-change-result';

@Component({
  selector: 'app-password-change',
  imports: [FormsModule, TuiIcon, TuiInput, TuiPassword, PasswordStrengthComponent],
  templateUrl: './password-change.component.html',
  styleUrl: './password-change.component.less',
})
export class PasswordChangeComponent {
  password: string | undefined;
  passwordConfirmation: string | undefined;
  minPasswordLength = input.required<number>();
  isPasswordConfirmationEnabled = input.required<boolean>();
  passwordValidation = output<PasswordChangeResult>();

  protected passwordChanged() {
    if (this.validateFields()) {
      this.passwordValidation.emit({isValid: true, password: this.password!});
    }
    else {
      this.passwordValidation.emit({isValid: false, password: ''});
    }
  }

  private validateFields(): boolean {
    if (!this.password) {
      console.log(`Password Empty`)
      return false;
    }

    if (this.password.length <= this.minPasswordLength()) {
      console.log(`Password must be at least ${this.minPasswordLength} characters`)
      return false;
    }

    if (this.isPasswordConfirmationEnabled() && this.password !== this.passwordConfirmation) {
      console.log(`Passwords do not match, please try again`)
      return false;
    }

    return true;
  }
}
