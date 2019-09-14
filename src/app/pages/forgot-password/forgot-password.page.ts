import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, AlertController } from '@ionic/angular';
import { CustomValidator } from 'src/app/validators/custom.validator';
import { AlertUtil } from 'src/app/utils/alert.util';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  public form: FormGroup;

  constructor(private fb: FormBuilder,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private authService: AuthService) {

    this.form = this.createForm();

  }

  ngOnInit() {
  }

  public sendMail(formValue: any): void {

    this.authService.forgotPassword(formValue).subscribe((res: any) => {
      AlertUtil.confirmDialog(this.alertCtrl, `Enviamos um email para ${formValue.email} com o link para redefinir sua senha!`);

      const link: string = `${location.origin}/reset-password/${res.token}`;

      // debugger only
      console.log(link);

      this.back();
    });

  }

  public back(): void {
    this.navCtrl.navigateBack('/login');
  }

  private createForm(): FormGroup {
    return this.fb.group({
      email: ['', [
        CustomValidator.required,
        CustomValidator.email
      ]]
    });
  }

}
