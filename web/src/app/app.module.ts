import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './usuario/home/home.component';
import { LoginComponent } from './login/login.component';
import { CrearUsuariosComponent } from './Administrador/crear-usuarios/crear-usuarios.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LibroComponent } from './usuario/libro/libro.component';
import { AuthGuard } from './roles/auth.guard';
import { EstadisticasComponent } from './Administrador/estadisticas/estadisticas.component';
import { NacionalidadComponent } from './Administrador/nacionalidad/nacionalidad.component';
import { CarreraComponent } from './Administrador/carrera/carrera.component';


import { CrearAutorComponent } from './Profesor/crear-autores/crear-autores.component';
import { EditarLibroComponent } from './Profesor/editar-libro/editar-libro.component';
import { EliminarLibroComponent } from './Profesor/eliminar-libro/eliminar-libro.component';
import { FormularioLibroComponent } from './Profesor/formulario-libro/formulario-libro.component';
import { CrearComponent } from './Administrador/carrera/crear/crear.component';
import { EditarComponent } from './Administrador/carrera/editar/editar.component';
import { EliminarComponent } from './Administrador/carrera/eliminar/eliminar.component';
import { AuthInterceptor } from './roles/auth.interceptor';
import { CatalogoLibrosComponent } from './Profesor/catalogo-libros/catalogo-libros.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CrearUsuariosComponent,
    EstadisticasComponent,
    NacionalidadComponent,
    CarreraComponent,
    LibroComponent,
    CatalogoLibrosComponent,
    CrearAutorComponent,
    EditarLibroComponent,
    EliminarLibroComponent,
    FormularioLibroComponent,
    NavBarComponent,
    LibroComponent,
    CrearComponent,
    EditarComponent,
    EliminarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule
  ],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
