import { AlertController } from '@ionic/angular';

export class AlertUtil {

    static async confirmDialog(alertCtrl: AlertController, msg: string, callback: Function = () => {}): Promise<void> {

        const alert = await alertCtrl.create({
            header: 'Confirmação!',
            message: msg,
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel',
                cssClass: 'secondary'
              }, {
                text: 'Ok',
                handler: () => callback()
              }
            ]
          });
      
          await alert.present();
    }
}