import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './usuario/home/home.component';
import { LoginComponent } from './login/login.component';
import { CrearUsuariosComponent } from './Administrador/crear-usuarios/crear-usuarios.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LibroComponent } from './usuario/libro/libro.component';
import { AuthGuard } from './roles/auth.guard';
import { EstadisticasComponent } from './Administrador/estadisticas/estadisticas.component';
import { NacionalidadComponent } from './Administrador/nacionalidad/nacionalidad.component';
import { CarreraComponent } from './Administrador/carrera/carrera.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CrearUsuariosComponent,
    
    NavBarComponent,
    LibroComponent,
    EstadisticasComponent,
    NacionalidadComponent,
    CarreraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule,FormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
