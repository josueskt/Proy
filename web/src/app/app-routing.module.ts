import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './usuario/home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './roles/auth.guard';
import { LibroComponent } from './usuario/libro/libro.component';
import { EstadisticasComponent } from './Administrador/estadisticas/estadisticas.component';
import { CarreraComponent } from './Administrador/carrera/carrera.component';

import { CrearUsuariosComponent } from './Administrador/crear-usuarios/crear-usuarios.component';
import { NacionalidadComponent } from './Administrador/nacionalidad/nacionalidad.component';
import { CambioContraComponent } from './cambio-contra/cambio-contra.component';
//import { MisLibrosComponent } from './profesor/mis-libros/mis-libros.component';



const routes: Routes = [
  //login

  { path: 'login', component: LoginComponent },
  {
    path: 'cambio_contra', component: CambioContraComponent, canActivate: [AuthGuard],
    data: { roles: ['PROFESOR', 'ESTUDIANTE', 'ADMINISTRADOR'] }
  },

  //Rutas de usuario
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard],
    data: { roles: ['PROFESOR', 'ESTUDIANTE', 'ADMINISTRADOR'] }
  },

  {
    path: 'libros', component: LibroComponent, canActivate: [AuthGuard],
    data: { roles: ['PROFESOR', 'ESTUDIANTE', 'ADMINISTRADOR'] }
  },
  {
    path: 'libro/:id', component: HomeComponent, canActivate: [AuthGuard],
    data: { roles: ['PROFESOR', 'ESTUDIANTE', 'ADMINISTRADOR'] }
  },


  //Rutas de administrador
  {
    path: 'Registrar_usuarios', component: CrearUsuariosComponent , canActivate: [AuthGuard],
    data: { roles: ['ADMINISTRADOR'] }
  },
  {
    path: 'estadisticas', component: EstadisticasComponent, canActivate: [AuthGuard],
    data: { roles: ['ADMINISTRADOR'] }
  },
  {
    path: 'carrera', component: CarreraComponent, canActivate: [AuthGuard],
    data: { roles: ['ADMINISTRADOR'] }
  },
  {
    path: 'nacionalidad', component: NacionalidadComponent, canActivate: [AuthGuard],
    data: { roles: ['ADMINISTRADOR'] }
  },




  //Rutas de profesor
  // {
  //   path: 'mis_libros', component: MisLibrosComponent, canActivate: [AuthGuard],
  //   data: { roles: ['PROFESOR'] }
  // },
  // {
  //   path: 'mi_libro/:id', component: MisLibrosComponent, canActivate: [AuthGuard],
  //   data: { roles: ['PROFESOR'] }
  // },
  // {
  //   path: 'crear_autor', component: HomeComponent, canActivate: [AuthGuard],
  //   data: { roles: ['PROFESOR'] }
  // },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
