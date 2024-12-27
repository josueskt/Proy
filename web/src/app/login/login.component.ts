import { Component,  OnInit, inject } from '@angular/core';
import { LoginService } from './login.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../roles/auth.service';
import { FormsModule } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink],
  viewProviders: [provideIcons({ featherAirplay, heroUsers })],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent  implements OnInit{
  mandado = false
  username = '';
  password = '';
  showPassword: boolean = false;
  private aunt = inject(LoginService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastrService: ToastrService = inject(ToastrService);
  lista = [
    {imagen:"DSC09767.JPG"},
    {imagen:"DSC09942.JPG"},
    {imagen:"IMG_20230614_153107.jpg"},
  
  ]

  ngOnInit() {
    // Obtener la información del usuario al inicializar el componente
    const userInfo = this.authService.getUserInfo();
    if (userInfo) {
      if(userInfo.cambio){
        this.router.navigate(['/user']).then(() => {
          window.location.reload();
        });
      }else{
        this.router.navigate(['/user/cambio_contra']).then(() => {
          window.location.reload();
        });
      }
     
    }
  }

  showHidePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.mandado = true
    this.aunt.login(this.username, this.password).subscribe({
     next: (response) => {
        if (response.message) {
          this.mandado = false
          this.toastrService.error(response.response.message, 'Fail', {
            timeOut: 4000, positionClass: 'toast-top-center',
          });
        } else if (response.token) {
          localStorage.setItem('token', response.token);
          this.username = '';
          this.password = '';
          this.router.navigate(['/user']).then(() => {
          //  window.location.reload();
          });
        } else {
          this.mandado = false
          console.error('Respuesta del servidor inesperada:', response);
        }
      },
      error:(e) =>  console.error('Error en la autenticación:', e)
    }
    );
  }
  login_out() {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
