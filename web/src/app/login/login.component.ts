import { Component } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string ="";
  password: string = "";
  constructor(private aunt:LoginService){}
  login() {
    this.aunt.login(this.username, this.password).subscribe(
      (response) => {
        // Maneja la respuesta del servidor aquí (por ejemplo, almacena el token)
        if(response.message){alert(response.message)
        }else if(response.token){

          localStorage.setItem('token', response.token);
          this.username = '';
          this.password = '';
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
  }
}
