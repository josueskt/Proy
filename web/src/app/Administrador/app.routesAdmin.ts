import { Routes } from '@angular/router';
import { AuthGuard } from '../roles/auth.guard';
import { CargaLibrosBloqueComponent } from './carga-libros-bloque/carga-libros-bloque.component';
import { CarreraComponent } from './carrera/carrera.component';
import { CrearUsuariosComponent } from './crear-usuarios/crear-usuarios.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { AdministradorComponent } from './administrador.component';
import { LibroTipoComponent } from './libro-tipo/libro-tipo.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';


export const routesAdmin: Routes = [

  {
    path: 'admin',
    component: AdministradorComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMINISTRADOR'] },
    children: [
      {
        path: 'estadisticas',
        component: EstadisticasComponent,
      },
      {
        path: 'Registrar_usuarios',
        component: CrearUsuariosComponent,
      },
      {
        path: 'carrera',
        component: CarreraComponent,
      },

      {
        path: 'subir_l_bloque',
        component: CargaLibrosBloqueComponent,
      },
      {
        path: 'tipo-libro',
        component: LibroTipoComponent, canActivate: [AuthGuard],
      },{
        path:'editar_usuario/:id',
        component:EditarUsuarioComponent,canActivate:[AuthGuard]
      }
    ]
  }
];
