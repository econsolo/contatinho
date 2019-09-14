import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainPage } from './pages/main/main.page';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  /* login */
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },

  /* signup */
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'reset-password/:token',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },
  /* main */
  {
    path: '',
    component: MainPage, canActivate: [AuthGuard],
    children: [
      {
        path: '', canActivate: [AuthGuard],
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'contact', canActivate: [AuthGuard],
        loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactPageModule)
      },
      {
        path: 'contact/:id', canActivate: [AuthGuard],
        loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactPageModule)
      }
    ]
  },
  /* not found */
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
