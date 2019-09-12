import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { CustomValidator } from 'src/app/validators/custom.validator';
import { AuthService } from 'src/app/services/auth.service';
import { AuthUtil } from 'src/app/utils/auth.util';
import { ToastUtil } from 'src/app/utils/toast.util';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public form: FormGroup;

  constructor(private builder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private toastCtrl: ToastController,
    private nav: NavController) {

    this.form = this.createFormGroup();
  }

  ngOnInit() {
  }

  public save(user: any): void {

    this.userService.save(user).subscribe((auth: any) => {
      this.login(auth);
    });

  }

  private login(auth: any): void {
    this.authService.login(auth).subscribe((res: any) => {
      AuthUtil.set(res);
      ToastUtil.show(this.toastCtrl, 'Bem vindo!');
      this.nav.navigateForward('/');
    });
  }

  private createFormGroup(): FormGroup {
    let password = this.builder.control('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)
    ]);
    return this.builder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(80),
        CustomValidator.onlyText
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: password,
      password_confirm: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        CustomValidator.equals(password)
      ]]
    });
  }
}
