import { Routes } from '@angular/router';
import { AuthGuard } from '../roles/auth.guard';

export const routesProfesor: Routes = [
  {
    path: 'profe',
    canActivate: [AuthGuard],
    data: { roles: ['PROFESOR', 'ADMINISTRADOR','BIBLIOTECA'] },
    loadComponent: () =>
      import('../Profesor/profesor.component').then((m) => m.ProfesorComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../Profesor/catalogo-libros/catalogo-libros.component').then((m) => m.CatalogoLibrosComponent),
      },
      {
        path: 'libro/:id',
        loadComponent: () =>
          import('../usuario/libro/libro.component').then((m) => m.LibroComponent),
      },
      {
        path: 'crear_autor',
        loadComponent: () =>
          import('../Profesor/crear-autores/crear-autores.component').then((m) => m.CrearAutorComponent),
      },
      {
        path: 'formulario',
        loadComponent: () =>
          import('../Profesor/formulario-libro/formulario-libro.component').then((m) => m.FormularioLibroComponent),
      },
      {
        path: 'editar/:id',
        loadComponent: () =>
          import('../Profesor/editar-libro/editar-libro.component').then((m) => m.EditarLibroComponent),
      },
    ],
  },
];
