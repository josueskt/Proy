import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './usuario/home/home.component';
import { LoginComponent } from './login/login.component';
import { CrearUsuariosComponent } from './Administrador/crear-usuarios/crear-usuarios.component';
import { MisLibrosComponent } from './Profesor/mis-libros/mis-libros.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CrearUsuariosComponent,
    MisLibrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
