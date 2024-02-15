import { Routes } from '@angular/router';
import { AuthGuard } from '../roles/auth.guard';

import { HomeComponent } from './home/home.component';
import { LibroComponent } from './libro/libro.component';
import { VistalibroComponent } from './vistalibro/vistalibro.component';
import { UsuarioComponent } from './usuario.component';
import { CambioContraComponent } from '../cambio-contra/cambio-contra.component';

export const routesUser: Routes = [
  {
    path: 'user',
    component: UsuarioComponent,
    canActivate: [AuthGuard],
    data: { roles: ['PROFESOR', 'ESTUDIANTE', 'ADMINISTRADOR'] },
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'libro',
        component: LibroComponent,
      },
      {
        path: 'libro/:id',
        component: VistalibroComponent,
      },
   
      {
        path: 'cambio_contra',
        component: CambioContraComponent,
      },
    ],
  },
];
