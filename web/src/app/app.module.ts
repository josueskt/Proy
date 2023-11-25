import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './usuario/home/home.component';
import { LoginComponent } from './login/login.component';
import { CrearUsuariosComponent } from './Administrador/crear-usuarios/crear-usuarios.component';
import { MisLibrosComponent } from './Profesor/mis-libros/mis-libros.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LibroComponent } from './usuario/libro/libro.component';
import { LibrosService } from './Profesor/libro.service';
import { CatalogoLibrosComponent } from './Profesor/catalogo-libros/catalogo-libros.component';
import { CrearAutorComponent } from './Profesor/crear-autores/crear-autores.component';
import { EditarLibroComponent } from './Profesor/editar-libro/editar-libro.component';
import { EliminarLibroComponent } from './Profesor/eliminar-libro/eliminar-libro.component';
import { FormularioLibroComponent } from './Profesor/formulario-libro/formulario-libro.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CrearUsuariosComponent,
    CatalogoLibrosComponent,
    CrearAutorComponent,
    EditarLibroComponent,
    EliminarLibroComponent,
    FormularioLibroComponent,
    LibroComponent,
    MisLibrosComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule,FormsModule,ReactiveFormsModule
  ],
  providers: [LibrosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
