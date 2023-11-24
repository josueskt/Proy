import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './usuario/home/home.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  //login

  { path: 'login', component: LoginComponent }, 

  //Rutas de usuario
  { path: '', component: HomeComponent }, 
  
  { path: 'libros', component: HomeComponent },
  { path: 'libro/:id', component: HomeComponent },
     
  
  //Rutas de administrador
  { path: 'Registrar_usuarios', component: HomeComponent },
  { path: 'Estadisticas', component: HomeComponent },
   


  //Rutas de profesor
  { path: 'mis_libros', component: HomeComponent },
  { path: 'mi_libro/:id', component: HomeComponent },
  { path: 'crear_autor', component: HomeComponent },   



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
