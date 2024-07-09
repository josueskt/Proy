import { Routes } from '@angular/router';
import { AuthGuard } from '../roles/auth.guard';
import { CargaLibrosBloqueComponent } from '../Administrador/carga-libros-bloque/carga-libros-bloque.component';
import { CarreraComponent } from '../Administrador/carrera/carrera.component';
import { CrearUsuariosComponent } from '../Administrador/crear-usuarios/crear-usuarios.component';
import { EstadisticasComponent } from '../Administrador/estadisticas/estadisticas.component';
import { AdministradorComponent } from '../Administrador/administrador.component';
import { LibroTipoComponent } from '../Administrador/libro-tipo/libro-tipo.component';
import { EditarUsuarioComponent } from '../Administrador/editar-usuario/editar-usuario.component';
import { CrearUsuarioComponent } from '../Administrador/crear-usuario/crear-usuario.component';


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
        path: 'Registrar_usuario',
        component: CrearUsuarioComponent,
      },
      {
        path: 'carrera',
        component: CarreraComponent,
      },

      {
        path: 'subir_l_bloque',
        component: CargaLibrosBloqueComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMINISTRADOR','BIBLIOTECA']}
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
