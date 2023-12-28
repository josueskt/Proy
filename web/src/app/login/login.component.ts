import { Component, Inject, inject } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AuthService } from '../roles/auth.service';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username ="";
  password = "";
  private aunt =inject(LoginService)
  private router= inject( Router )
  private authService = inject( AuthService)

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
        


    }
      
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
