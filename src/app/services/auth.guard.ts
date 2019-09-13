import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthUtil } from '../utils/auth.util';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private nav: NavController,
        private toast: ToastController) { }

    public async canActivate(): Promise<boolean> {
        const user = AuthUtil.get();

        if (!user) {
            const toast = await this.toast.create({
                message: 'Você não está autorizado à acessar esta funcionalidade',
                duration: 3000
            });

            toast.present();
            this.nav.navigateForward('/login');
            return false;
        }

        return true;
    }

}