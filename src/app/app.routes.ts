import { Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { AuthGuard } from './service/auth-guard';
import { LoginComponent } from './view/login/login.component';

export const routes: Routes = [
  {
    path: '',
    // redirectTo: '/chat',
    // pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'chat',
    component: HomeComponent
  }
];
