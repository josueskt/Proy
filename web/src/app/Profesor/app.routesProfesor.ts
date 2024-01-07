import { Routes } from '@angular/router';
import { AuthGuard } from '../roles/auth.guard';
import { LibroComponent } from '../usuario/libro/libro.component';
import { CatalogoLibrosComponent } from './catalogo-libros/catalogo-libros.component';
import { CrearAutorComponent } from './crear-autores/crear-autores.component';
import { EditarLibroComponent } from './editar-libro/editar-libro.component';
import { EliminarLibroComponent } from './eliminar-libro/eliminar-libro.component';
import { FormularioLibroComponent } from './formulario-libro/formulario-libro.component';



export const routesProfesor: Routes = [

  //Rutas de profesor
  {
    path: 'catalogo', component: CatalogoLibrosComponent, canActivate: [AuthGuard],
    data: { roles: ['PROFESOR','ADMINISTRADOR'] }
  },
  {
    path: 'libro/:id', component: LibroComponent, canActivate: [AuthGuard],
    data: { roles: ['PROFESOR'] }
  },
  {
    path: 'crear_autor', component: CrearAutorComponent, canActivate: [AuthGuard],
    data: { roles: ['PROFESOR'] }
  },
  {
    path: 'crear-autores', component: CrearAutorComponent, canActivate: [AuthGuard],
    data: { roles: ['PROFESOR'] }
  },
  {
    path: 'libro/:id/editar', component: EditarLibroComponent, canActivate: [AuthGuard],
    data: { roles: ['PROFESOR'] }
  },
  {
    path: 'libro/:id/eliminar', component: EliminarLibroComponent, canActivate: [AuthGuard],
    data: { roles: ['PROFESOR','ADMINISTRADOR'] }
  },
  {
    path: 'formulario', component: FormularioLibroComponent, canActivate: [AuthGuard],
    data: { roles: ['PROFESOR'] }
  },

];
