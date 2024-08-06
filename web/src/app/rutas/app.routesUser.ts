import { Routes } from '@angular/router';
import { AuthGuard } from '../roles/auth.guard';

import { HomeComponent } from '../usuario/home/home.component';
import { LibroComponent } from '../usuario/libro/libro.component';
import { VistalibroComponent } from '../usuario/vistalibro/vistalibro.component';
import { UsuarioComponent } from '../usuario/usuario.component';
import { CambioContraComponent } from '../cambio-contra/cambio-contra.component';

export const routesUser: Routes = [
  {
    path: 'user',
    component: UsuarioComponent,
    canActivate: [AuthGuard],
    data: { roles: ['PROFESOR', 'ESTUDIANTE', 'ADMINISTRADOR','BIBLIOTECA'] },
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