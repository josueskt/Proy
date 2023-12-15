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
import { CatalogoLibrosComponent } from './Profesor/catalogo-libros/catalogo-libros.component';
import { CrearAutorComponent } from './Profesor/crear-autores/crear-autores.component';
import { EditarLibroComponent } from './Profesor/editar-libro/editar-libro.component';
import { EliminarLibroComponent } from './Profesor/eliminar-libro/eliminar-libro.component';
import { FormularioLibroComponent } from './Profesor/formulario-libro/formulario-libro.component';


import { AuthInterceptor } from './roles/auth.interceptor';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { CambioContraComponent } from './cambio-contra/cambio-contra.component';
import { VistalibroComponent } from './usuario/vistalibro/vistalibro.component';
import { ExplorarComponent } from './usuario/explorar/explorar.component';


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
   
    CambioContraComponent,
    
    VistalibroComponent,
    ExplorarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule, // Mueve esta línea a la sección imports
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
