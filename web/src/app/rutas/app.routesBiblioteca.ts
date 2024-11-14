import { Routes } from '@angular/router';
import { AuthGuard } from '../roles/auth.guard';

export const routesBiblioteca: Routes = [
  {
    path: 'biblioteca',
    canActivate: [AuthGuard],
    data: { roles: ['BIBLIOTECA', 'ADMINISTRADOR'] },
    loadComponent: () =>
      import('../biblioteca/biblioteca.component').then((m) => m.BibliotecaComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../biblioteca/biblioteca.component').then((m) => m.BibliotecaComponent),
      },
      {
        path: 'estantes',
        loadComponent: () =>
          import('../biblioteca/estantes/estantes.component').then((m) => m.EstantesComponent),
      },
      {
        path: 'estantes/editar/:id',
        loadComponent: () =>
          import('../biblioteca/estantes/editar-estante/editar-estante.component').then((m) => m.EditarEstanteComponent),
      },
      {
        path: 'seccion/:id',
        loadComponent: () =>
          import('../biblioteca/seccion/editar-seccion/editar-seccion.component').then((m) => m.EditarSeccionComponent),
      },
      {
        path: 'secciones/:id',
        loadComponent: () =>
          import('../biblioteca/secciones/secciones.component').then((m) => m.SeccionesComponent),
      },
      {
        path: 'secciones/editar/:id',
        loadComponent: () =>
          import('../biblioteca/seccion/editar-seccion/editar-seccion.component').then((m) => m.EditarSeccionComponent),
      },
      {
        path: 'prestamos',
        loadComponent: () =>
          import('../biblioteca/prestamos/prestamos.component').then((m) => m.PrestamosComponent),
      },
      {
        path: 'devolucion',
        loadComponent: () =>
          import('../biblioteca/devoluciones/devoluciones.component').then((m) => m.DevolucionesComponent),
      },
      {
        path: 'subir_libros',
        loadComponent: () =>
          import('../Administrador/carga-libros-bloque/carga-libros-bloque.component').then((m) => m.CargaLibrosBloqueComponent),
      },
      {
        path: 'inventario',
        loadComponent: () =>
          import('../biblioteca/inventario/inventario.component').then((m) => m.InventarioComponent),
      },
      {
        path: 'historial/:id',
        loadComponent: () =>
          import('../biblioteca/prestamos/hitorial-prestamos/hitorial-prestamos.component').then((m) => m.HitorialPrestamosComponent),
      },
      {
        path: 'ingreso',
        loadComponent: () =>
          import('../biblioteca/ingreso/ingreso.component').then((m) => m.IngresoComponent),
      },
      {
        path: 'ingreso/registro',
        loadComponent: () =>
          import('../biblioteca/ingreso/informeingreso/informeingreso.component').then((m) => m.InformeingresoComponent),
      },
    ],
  },
];
