import { Component, OnInit, inject } from '@angular/core';


import { AuthService } from '../roles/auth.service';
import { RouterLink } from '@angular/router';
import { Usuario } from '../interfaces/usuario.interface';


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

}
