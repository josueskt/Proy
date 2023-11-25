import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AuthService } from '../roles/auth.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string ="";
  password: string = "";
  constructor(private aunt:LoginService,private router: Router ,private authService: AuthService ){}

  ngOnInit() {
    // Obtener la información del usuario al inicializar el componente
    const userInfo = this.authService.getUserInfo();
    if(userInfo){
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    }
    
  }




  login() {
    this.aunt.login(this.username, this.password).subscribe(
      (response) => {
        // Maneja la respuesta del servidor aquí (por ejemplo, almacena el token)
        if(response.message){alert(response.message)
        }else if(response.token){

          localStorage.setItem('token', response.token);
          this.username = '';
          this.password = '';
          // Por ejemplo, navegar a la ruta '/otra-ruta'
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        


      console.log(localStorage.getItem('token'))}
      
      else {
        console.error('Respuesta del servidor inesperada:', response);
      }
      },
      (error) => {
        // Maneja el error aquí
        console.error('Error en la autenticación:', error);
      }
    );
  }
  login_out(){

    localStorage.removeItem('token');
    window.location.reload();
    
  }
}
