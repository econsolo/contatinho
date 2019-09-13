import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthUtil } from 'src/app/utils/auth.util';
import { AlertUtil } from 'src/app/utils/alert.util';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  public user: any;

  constructor(private navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.user = AuthUtil.get();
  }

  public logout(): void {
    AlertUtil.confirmDialog(this.alertCtrl, 'Deseja sair?', () => {
      AuthUtil.clear();
      this.navCtrl.navigateBack('/login');
    });
  }

}
