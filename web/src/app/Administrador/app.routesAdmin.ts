import { Routes } from '@angular/router';
import { AuthGuard } from '../roles/auth.guard';
import { CargaLibrosBloqueComponent } from './carga-libros-bloque/carga-libros-bloque.component';
import { CarreraComponent } from './carrera/carrera.component';
import { CrearUsuariosComponent } from './crear-usuarios/crear-usuarios.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

export const routesAdmin: Routes = [
  //Rutas de administrador
  {
    path: 'Registrar_usuarios',
    component: CrearUsuariosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMINISTRADOR'] },
  },
  {
    path: 'estadisticas',
    component: EstadisticasComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMINISTRADOR'] },
  },
  {
    path: 'carrera',
    component: CarreraComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMINISTRADOR'] },
  },

  {
    path: 'subir_l_bloque',
    component: CargaLibrosBloqueComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMINISTRADOR'] },
  },
];
