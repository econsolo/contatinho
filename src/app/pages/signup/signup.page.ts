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
    this.userService.save(user).subscribe(() => {
      this.login({
        email: user.email,
        password: user.password
      });
    });

  }

  public back(): void {
    this.nav.navigateBack('/login');
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
      CustomValidator.required,
      CustomValidator.minLength(6),
      CustomValidator.maxLength(20)
    ]);
    return this.builder.group({
      name: ['', [
        CustomValidator.required,
        CustomValidator.minLength(3),
        CustomValidator.maxLength(80)
      ]],
      email: ['', [
        CustomValidator.required,
        CustomValidator.email
      ]],
      password: password,
      password_confirm: ['', [
        CustomValidator.required,
        CustomValidator.minLength(6),
        CustomValidator.maxLength(20),
        CustomValidator.equals(password, CustomValidator.msg_password_dont_match)
      ]]
    });
  }
}
