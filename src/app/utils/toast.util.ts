import { ToastController } from '@ionic/angular';

export class ToastUtil {

    static async show(toastController: ToastController, message: string): Promise<void> {

        var toast = await toastController.create({
            message: message,
            duration: 3000
        });

        toast.present();
    }
}