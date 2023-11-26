import { Component, Input } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../roles/auth.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  userInfo: any;
  nombre =""
rol= ""
  hola ="hola"
  correo = ""
  constructor(private authService: AuthService,private router: Router) {


  }

  
  ngOnInit() {
    // Obtener la información del usuario al inicializar el componente
    this.userInfo = this.authService.getUserInfo();
    this.nombre = this.userInfo.nombre
    this.rol = this.userInfo.nombre_rol
    this.correo  = this.userInfo.email
    
  }
  login_out(){
    
    localStorage.removeItem('token');
    window.location.reload();

  }
  
  

}
