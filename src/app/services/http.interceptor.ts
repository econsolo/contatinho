import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { throwError, from } from 'rxjs';
import { LoadingController, ToastController } from '@ionic/angular';
import { ToastUtil } from '../utils/toast.util';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private loadingCtrl: LoadingController,
        private toastCtrl: ToastController) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {

        return from(this.handle(request, next));
    }

    async handle(req: HttpRequest<any>, next: HttpHandler) {

        const loading = await this.loadingCtrl.create({
            message: 'Carregando...'
        });

        loading.present();

        return next.handle(req).pipe(
            catchError(err => {
                const msg = 'Ocorreu um erro não esperado.';
                ToastUtil.show(this.toastCtrl, msg);
                return throwError(err);
            }),
            finalize(() => {
                loading.dismiss();
            })
        ).toPromise();
    }
}