import { Component, OnInit, TRANSLATIONS, inject } from '@angular/core';


import { AuthService } from '../roles/auth.service';
import { NavigationEnd, NavigationError, NavigationSkipped, NavigationStart, Router, RouterLink } from '@angular/router';
import { Usuario } from '../interfaces/usuario.interface';
import { Navinterface } from './nav.interface';
import { LoaderComponent } from "../componentes/loader/loader.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, LoaderComponent,CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userInfo: Usuario;
  nombre =""
  rol= ""
  correo = ""
  constructor(private router: Router) {}

  private authService = inject( AuthService)

  full_loader = false
  async ngOnInit() {
    this.userInfo =  this.authService.getUserInfo();
    this.nombre = this.userInfo.nombre
    this.rol = this.userInfo.nombre_rol
    this.correo  = this.userInfo.email
    this.router.events.subscribe(event => {
      this.full_loader = true
      if (event instanceof NavigationEnd) {
this.full_loader = false
      }
     else if(event instanceof NavigationError){
        this.full_loader = false

      }
      else if(event instanceof NavigationStart){
        this.full_loader = false

      }
      else if( event instanceof NavigationSkipped){
        this.full_loader = false

      }
    });
   

  }
  login_out(){
    localStorage.removeItem('token');
    window.location.reload();
  }
  rutas: Navinterface[] = [
    {
      rol: "PROFESOR",
      opciones: [
        {titulo: "BIBLIOTECA FISICA", direcion: "/user/fisico", icono: "fas fa-book", color: '#e5d599'},
        {titulo: "LIBROS DIGITALES", direcion: "/profe", icono: "fas fa-book", color: '#ff854d'},
        {titulo: "CREAR AUTOR", direcion: "/profe/crear_autor", icono: "fas fa-user-plus", color: '#ff854d'},
      ]
    },
    {
      rol: "ESTUDIANTE",
      opciones: [
        {titulo: "MIS LIBROS", direcion: "/estudiante/mis_libros", icono: "fas fa-book-open", color: '#ff854d'},
      ]
    },
    {
      rol: "ADMINISTRADOR",
      opciones: [
        {titulo: "BIBLIOTECA FISICA", direcion: "/user/fisico", icono: "fas fa-book", color: '#e5d599'},

        {titulo: "ESTADISTICAS DE INICIO", direcion: "/admin/estadisticas", icono: "fas fa-chart-line", color: '#005CB9'},
        {titulo: "REGISTRO DE USUARIOS POR LOTE", direcion: "/admin/Registrar_usuarios", icono: "fas fa-users-cog", color: '#005CB9'},
        {titulo: "REGISTRO DE USUARIO", direcion: "/admin/Registrar_usuario", icono: "fas fa-user-plus", color: '#005CB9'},
        {titulo: "REGISTRO DE CARRERAS", direcion: "/admin/carrera", icono: "fas fa-graduation-cap", color: '#005CB9'},
        {titulo: "LIBROS POR LOTE", direcion: "/admin/subir_l_bloque", icono: "fas fa-upload", color: '#005CB9'},
        {titulo: "LIBROS DIGITALES", direcion: "/profe", icono: "fas fa-book", color: '#ffc219'},
        {titulo: "CREAR AUTOR", direcion: "/profe/crear_autor", icono: "fas fa-user-plus", color: '#ffc219'},
        {titulo: "TIPOS DE LIBRO", direcion: "/admin/tipo-libro", icono: "fas fa-bookmark", color: '#005CB9'},
        {titulo: "REPORTES", direcion: "/admin/reportes", icono: "fas fa-file-alt", color: '#005CB9'},
        {titulo: "ESTANTES", direcion: "/biblioteca/estantes", icono: "fas fa-cogs", color: '#e32551'},
        {titulo: "INVENTARIO", direcion: "/biblioteca/inventario", icono: "fas fa-box", color: '#e32551'},
        {titulo: "PRESTAMOS", direcion: "/biblioteca/prestamos", icono: "fas fa-hand-holding", color: '#e32551'},
        {titulo: "DEVOLUCIONES", direcion: "/biblioteca/devolucion", icono: "fas fa-reply", color: '#e32551'},
        {titulo: "INGRESO", direcion: "/biblioteca/ingreso", icono: "fas fa-sign-in-alt", color: '#e32551'},
        {titulo: "REPORTES", direcion: "/biblioteca/ingreso/registro", icono: "fas fa-chart-pie", color: '#e32551'},
      ]
    },
    {
      rol: "BIBLIOTECA",
      opciones: [
        {titulo: "BIBLIOTECA FISICA", direcion: "/user/fisico", icono: "fas fa-book", color: '#e5d599'},

        {titulo: "ESTANTES", direcion: "/biblioteca/estantes", icono: "fas fa-cogs", color: '#e32551'},
        {titulo: "INVENTARIO", direcion: "/biblioteca/inventario", icono: "fas fa-box", color: '#e32551'},
        {titulo: "PRESTAMOS", direcion: "/biblioteca/prestamos", icono: "fas fa-hand-holding", color: '#e32551'},
        {titulo: "DEVOLUCIONES", direcion: "/biblioteca/devolucion", icono: "fas fa-reply", color: '#e32551'},
        {titulo: "LIBROS BLOQUE", direcion: "/biblioteca/subir_libros", icono: "fas fa-upload", color: '#e32551'},
        {titulo: "INGRESO", direcion: "/biblioteca/ingreso", icono: "fas fa-sign-in-alt", color: '#e32551'},
        {titulo: "REPORTES", direcion: "/biblioteca/ingreso/registro", icono: "fas fa-chart-pie", color: '#e32551'},
      ]
    }
  ]
  
}
