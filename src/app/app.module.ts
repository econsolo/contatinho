import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainPage } from './pages/main/main.page';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './services/http.interceptor';
import { AuthGuard } from './services/auth.guard';
import { MaskPipe } from './pipes/mask.pipe';

@NgModule({
	declarations: [
		AppComponent,
		MainPage
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		HttpClientModule
	],
	providers: [
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: Interceptor,
			multi: true
		},
		AuthGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule { }