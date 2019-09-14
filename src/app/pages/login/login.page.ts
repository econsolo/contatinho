import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AuthUtil } from 'src/app/utils/auth.util';
import { ToastUtil } from 'src/app/utils/toast.util';
import { CustomValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public form: FormGroup;

  constructor(private builder: FormBuilder,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private nav: NavController) {

    this.form = this.createFormGroup();
  }

  ngOnInit() {
  }

  public login(auth: any): void {
    this.authService.login(auth).subscribe((res: any) => {
      AuthUtil.set(res);
      ToastUtil.show(this.toastCtrl, 'Bem vindo!');
      this.nav.navigateForward('/');
    });
  }

  public goTo(route: string): void {
    this.nav.navigateForward(route);
  }

  private createFormGroup(): FormGroup {
    return this.builder.group({
      email: ['', [
        CustomValidator.required,
        CustomValidator.email
      ]],
      password: ['', [
        CustomValidator.required,
        CustomValidator.minLength(6),
        CustomValidator.maxLength(20)
      ]]
    });
  }

}
