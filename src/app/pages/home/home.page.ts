import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController, ActionSheetController } from '@ionic/angular';
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
    private contactService: ContactService,
    public actionSheetCtrl: ActionSheetController) { }

  ngOnInit(): void {
    this.get();
  }

  public goToContact(id: string): void {
    this.navCtrl.navigateForward(`/contact/${id}`);
  }

  public async openActionSheet(contact: any): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opções',
      buttons: [
        {
          text: 'Chamar',
          icon: 'call',
          handler: () => {
            window.open(`tel:${contact.phone}`, '_blank');
          }
        },
        {
          text: 'Alterar',
          icon: 'create',
          handler: () => {
            this.goToContact(contact.id);
          }
        },
        {
          text: 'Remover',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.delete(contact.id);
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }]
    });
    await actionSheet.present();
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
