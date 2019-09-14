import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, ToastController } from '@ionic/angular';
import { CustomValidator } from 'src/app/validators/custom.validator';
import { ToastUtil } from 'src/app/utils/toast.util';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  public form: FormGroup;

  constructor(private fb: FormBuilder,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private authService: AuthService) {

    this.form = this.createForm();
  }

  ngOnInit() {
  }

  public reset(formValue: any): void {
    this.authService.resetPassword(formValue).subscribe(() => {
      ToastUtil.show(this.toastCtrl, 'Sua senha foi redefinida!');
      this.back();
    });
  }

  public back(): void {
    this.navCtrl.navigateBack('/login');
  }

  private createForm(): FormGroup {
    let password = this.fb.control('', [
      CustomValidator.required,
      CustomValidator.minLength(6),
      CustomValidator.maxLength(20)
    ]);
    return this.fb.group({
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
