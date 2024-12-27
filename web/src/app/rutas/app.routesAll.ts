import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ResetPassComponent } from '../usuario/reset-pass/reset-pass.component';
import { RestablecerComponent } from '../usuario/restablecer/restablecer.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPassComponent },
  { path: 'restablecer/:id', component: RestablecerComponent },
  { path: '', redirectTo: '/user', pathMatch: 'full' },
];