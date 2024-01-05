import { Component, inject } from '@angular/core';


import { AuthService } from '../roles/auth.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  userInfo: any;
  nombre =""
rol= ""
  hola ="hola"
  correo = ""


    private authService = inject( AuthService)
    


  

  
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
