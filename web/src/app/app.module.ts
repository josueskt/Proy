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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CrearUsuariosComponent,
    
    NavBarComponent,
    LibroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule,FormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
