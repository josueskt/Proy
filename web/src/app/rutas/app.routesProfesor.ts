import { Routes } from '@angular/router';
import { AuthGuard } from '../roles/auth.guard';
import { LibroComponent } from '../usuario/libro/libro.component';
import { CatalogoLibrosComponent } from '../Profesor/catalogo-libros/catalogo-libros.component';
import { CrearAutorComponent } from '../Profesor/crear-autores/crear-autores.component';
import { EditarLibroComponent } from '../Profesor/editar-libro/editar-libro.component';
import { FormularioLibroComponent } from '../Profesor/formulario-libro/formulario-libro.component';
import { ProfesorComponent } from '../Profesor/profesor.component';


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
        path: 'formulario',
        component: FormularioLibroComponent,
      },
      {
        path:'editar/:id',
        component: EditarLibroComponent
      }
    ],
  },
];
