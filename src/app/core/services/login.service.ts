import { Injectable } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { LoginModalComponent } from '../components/login-modal/login-modal.component';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private modalPromise?: Promise<boolean>;

  constructor(private dialog: TuiDialogService) { }

  openLoginModal(): Promise<boolean> {

    if (this.modalPromise) {
      return this.modalPromise;
    }

    this.modalPromise = new Promise<boolean>(resolve => {
      this.dialog
        .open<boolean>(new PolymorpheusComponent(LoginModalComponent), {
          label: 'Please Enter Your Credentials',
          closable: false,
          dismissible: false,
          size: 'm',
        })
        .subscribe({
          next: result => resolve(result === true),
          error: () => resolve(false),
          complete: () => resolve(false),
        });
    }).finally(() => {
      this.modalPromise = undefined;
    });

    return this.modalPromise;
  }
}
