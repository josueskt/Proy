import { Routes } from '@angular/router';
import { AuthGuard } from '../roles/auth.guard';
import { AdministradorComponent } from '../Administrador/administrador.component';

export const routesAdmin: Routes = [
  {
    path: 'admin',
    component: AdministradorComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMINISTRADOR'] },
    children: [
      {
        path: 'estadisticas',
        loadComponent: () =>
          import('../Administrador/estadisticas/estadisticas.component').then(
            (m) => m.EstadisticasComponent
          ),
      },
      {
        path: 'Registrar_usuarios',
        loadComponent: () =>
          import('../Administrador/crear-usuarios/crear-usuarios.component').then(
            (m) => m.CrearUsuariosComponent
          ),
      },
      {
        path: 'Registrar_usuario',
        loadComponent: () =>
          import('../Administrador/crear-usuario/crear-usuario.component').then(
            (m) => m.CrearUsuarioComponent
          ),
      },
      {
        path: 'carrera',
        loadComponent: () =>
          import('../Administrador/carrera/carrera.component').then(
            (m) => m.CarreraComponent
          ),
      },
      {
        path: 'carrera/:id',
        loadComponent: () =>
          import('../Administrador/carrera/editar-carrea/editar-carrea.component').then(
            (m) => m.EditarCarreaComponent
          ),
      },
      {
        path: 'subir_l_bloque',
        loadComponent: () =>
          import('../Administrador/carga-libros-bloque/carga-libros-bloque.component').then(
            (m) => m.CargaLibrosBloqueComponent
          ),
        canActivate: [AuthGuard],
        data: { roles: ['ADMINISTRADOR', 'BIBLIOTECA'] },
      },
      {
        path: 'tipo-libro',
        loadComponent: () =>
          import('../Administrador/libro-tipo/libro-tipo.component').then(
            (m) => m.LibroTipoComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'editar_usuario/:id',
        loadComponent: () =>
          import('../Administrador/editar-usuario/editar-usuario.component').then(
            (m) => m.EditarUsuarioComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'reportes',
        loadComponent: () =>
          import('../Administrador/reporte-libros/reporte-libros.component').then(
            (m) => m.ReporteLibrosComponent
          ),
      },
    ],
  },
];
