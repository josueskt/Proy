import { Routes } from '@angular/router';
import { AuthGuard } from '../roles/auth.guard';
import { LibroComponent } from '../usuario/libro/libro.component';
import { CatalogoLibrosComponent } from './catalogo-libros/catalogo-libros.component';
import { CrearAutorComponent } from './crear-autores/crear-autores.component';
import { EditarLibroComponent } from './editar-libro/editar-libro.component';
import { FormularioLibroComponent } from './formulario-libro/formulario-libro.component';
import { ProfesorComponent } from './profesor.component';

export const routesProfesor: Routes = [
  {
    path: 'profe',
    component: ProfesorComponent,
    canActivate: [AuthGuard],
    data: { roles: ['PROFESOR', 'ADMINISTRADOR'] },
    children: [
      {
        path: '',
        component: CatalogoLibrosComponent,
      },
      {
        path: 'libro/:id',
        component: LibroComponent,
      },
      {
        path: 'crear_autor',
        component: CrearAutorComponent,
      },
      {
        path: 'libro/:id/editar',
        component: EditarLibroComponent,
      },
      {
        path: 'formulario',
        component: FormularioLibroComponent,
      },
    ],
  },
];
