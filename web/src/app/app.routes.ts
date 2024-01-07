import { Routes } from '@angular/router';
import { AuthGuard } from './roles/auth.guard';
import { CargaLibrosBloqueComponent } from './Administrador/carga-libros-bloque/carga-libros-bloque.component';
import { CarreraComponent } from './Administrador/carrera/carrera.component';
import { CrearUsuariosComponent } from './Administrador/crear-usuarios/crear-usuarios.component';
import { EstadisticasComponent } from './Administrador/estadisticas/estadisticas.component';
import { CatalogoLibrosComponent } from './Profesor/catalogo-libros/catalogo-libros.component';
import { CrearAutorComponent } from './Profesor/crear-autores/crear-autores.component';
import { EditarLibroComponent } from './Profesor/editar-libro/editar-libro.component';
import { EliminarLibroComponent } from './Profesor/eliminar-libro/eliminar-libro.component';
import { FormularioLibroComponent } from './Profesor/formulario-libro/formulario-libro.component';
import { CambioContraComponent } from './cambio-contra/cambio-contra.component';
import { LoginComponent } from './login/login.component';
import { ExplorarComponent } from './usuario/explorar/explorar.component';
import { HomeComponent } from './usuario/home/home.component';
import { LibroComponent } from './usuario/libro/libro.component';
import { VistalibroComponent } from './usuario/vistalibro/vistalibro.component';
import { LibroTipoComponent } from './Administrador/libro-tipo/libro-tipo.component';


export const routes: Routes = [
  //login

  { path: 'login', component: LoginComponent },
  
  {
    path: 'cambio_contra',
    component: CambioContraComponent,
    canActivate: [AuthGuard],
    data: { roles: ['PROFESOR', 'ESTUDIANTE', 'ADMINISTRADOR'] },
  },

  //Rutas de usuario
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['PROFESOR', 'ESTUDIANTE', 'ADMINISTRADOR'] },
  },

  {
    path: 'libro',
    component: LibroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['PROFESOR', 'ESTUDIANTE', 'ADMINISTRADOR'] },
  },
  {
    path: 'libro/:id',
    component: VistalibroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['PROFESOR', 'ESTUDIANTE', 'ADMINISTRADOR'] },
  },
  {
    path: 'explorar',
    component: ExplorarComponent,
    canActivate: [AuthGuard],
    data: { roles: ['PROFESOR', 'ESTUDIANTE', 'ADMINISTRADOR'] },
  },

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
  {
    path: 'tipo-libro', component: LibroTipoComponent, canActivate: [AuthGuard],
    data: { roles: ['ADMINISTRADOR'] }
  },

  //Rutas de profesor
  {
    path: 'catalogo',
    component: CatalogoLibrosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['PROFESOR', 'ADMINISTRADOR'] },
  },
  {
    path: 'libro/:id',
    component: LibroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['PROFESOR'] },
  },
  {
    path: 'crear_autor',
    component: CrearAutorComponent,
    canActivate: [AuthGuard],
    data: { roles: ['PROFESOR'] },
  },
  {
    path: 'crear-autores',
    component: CrearAutorComponent,
    canActivate: [AuthGuard],
    data: { roles: ['PROFESOR'] },
  },
  {
    path: 'libro/:id/editar',
    component: EditarLibroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['PROFESOR'] },
  },
  {
    path: 'libro/:id/eliminar',
    component: EliminarLibroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['PROFESOR', 'ADMINISTRADOR'] },
  },
  {
    path: 'formulario',
    component: FormularioLibroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['PROFESOR'] },
  },
];
