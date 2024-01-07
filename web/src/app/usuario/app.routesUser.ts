import { Routes } from '@angular/router';
import { AuthGuard } from '../roles/auth.guard';
import { ExplorarComponent } from './explorar/explorar.component';
import { HomeComponent } from './home/home.component';
import { LibroComponent } from './libro/libro.component';
import { VistalibroComponent } from './vistalibro/vistalibro.component';

export const routesUser: Routes = [

  //Rutas de usuario
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard],
    data: { roles: ['PROFESOR', 'ESTUDIANTE', 'ADMINISTRADOR'] }
  },

  {
    path: 'libro', component: LibroComponent, canActivate: [AuthGuard],
    data: { roles: ['PROFESOR', 'ESTUDIANTE', 'ADMINISTRADOR'] }
  },
  {
    path: 'libro/:id', component: VistalibroComponent, canActivate: [AuthGuard],
    data: { roles: ['PROFESOR', 'ESTUDIANTE', 'ADMINISTRADOR'] }
  },
  {
    path: 'explorar', component: ExplorarComponent, canActivate: [AuthGuard],
    data: { roles: ['PROFESOR', 'ESTUDIANTE', 'ADMINISTRADOR'] }
  },
];
