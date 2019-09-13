import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { ContactService } from 'src/app/services/contact.service';
import { Observable } from 'rxjs';
import { AlertUtil } from 'src/app/utils/alert.util';
import { ToastUtil } from 'src/app/utils/toast.util';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public contacts: Observable<any>;

  constructor(private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private contactService: ContactService) { }

  ngOnInit(): void {
    this.get();
  }

  public goToContact(id: string): void {
    this.navCtrl.navigateForward(`/contact/${id}`);
  }

  public delete(id: string): void {
    AlertUtil.confirmDialog(this.alertCtrl, 'Remover o contato?', () => {

      this.contactService.delete(id).subscribe(() => {
        ToastUtil.show(this.toastCtrl, 'Contato removido!');
        this.get();
      });

    });
  }

  public newContact(): void {
    this.navCtrl.navigateForward('/contact');
  }

  private get(): void {
    this.contacts = this.contactService.get();
  }

}
