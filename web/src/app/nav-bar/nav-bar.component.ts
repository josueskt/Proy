import { Component, OnInit, inject } from '@angular/core';


import { AuthService } from '../roles/auth.service';
import { RouterLink } from '@angular/router';
import { Usuario } from '../interfaces/usuario.interface';
import { Navinterface } from './nav.interface';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userInfo: Usuario;
  nombre =""
  rol= ""
  correo = ""

  private authService = inject( AuthService)

  async ngOnInit() {
    // Obtener la información del usuario al inicializar el componente
    this.userInfo =  this.authService.getUserInfo();
    this.nombre = this.userInfo.nombre
    this.rol = this.userInfo.nombre_rol
    this.correo  = this.userInfo.email
   
   

  }
  login_out(){
    localStorage.removeItem('token');
    window.location.reload();
  }


  rutas:Navinterface[] = [
    {rol:"PROFESOR",opciones:[
      {titulo:"MIS LIBROS",direcion:"/profe",icono:""},
      {titulo:"CREAR AUTOR",direcion:"/profe/crear_autor",icono:""},
     
    ]},
    {rol:"ESTUDIANTE",opciones:[
      {titulo:"",direcion:"",icono:""},
    
    ]},
    {rol:"ADMINISTRADOR",opciones:[
      {titulo:"ESTADISTICAS DE INICIO",direcion:"/admin/estadisticas",icono:""},
      {titulo:"REGISTRO DE USUARIOS POR LOTE",direcion:"/admin/Registrar_usuarios",icono:""},
      {titulo:"REGISTRO DE USUARIO",direcion:"/admin/Registrar_usuario",icono:""},
      {titulo:"REGISTRO DE CARRERAS",direcion:"/admin/carrera",icono:""},
      {titulo:"LIBROS POR LOTE",direcion:"/admin/subir_l_bloque",icono:""},
      {titulo:"MIS LIBROS",direcion:"/profe",icono:""},
      {titulo:"TIPOS DE LIBRO",direcion:"/admin/tipo-libro",icono:""},
      {titulo:"REPORTES",direcion:"/admin/reportes",icono:""},
      
    ]},
    {rol:"BIBLIOTECA",opciones:[
      {titulo:"ESTANTES",direcion:"/biblioteca/estantes",icono:""},
      {titulo:"INVENTARIO",direcion:"/biblioteca/inventario",icono:""},
      {titulo:"PRESTAMOS",direcion:"/biblioteca/prestamos",icono:""},
      {titulo:"DEVOLUCIONES",direcion:"/biblioteca/devolucion",icono:""},
      {titulo:"LIBROS BLOQUE ",direcion:"/biblioteca/subir_libros",icono:""},
      {titulo:"INGRESO",direcion:"/biblioteca/ingreso",icono:""},
      {titulo:"REPORTES",direcion:"/biblioteca/ingreso/registro",icono:""},
    ]}
  ]

}
