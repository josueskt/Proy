import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { LoginService } from '../../login/login.service';
import { AuthService } from '../../roles/auth.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-pass',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './reset-pass.component.html',
  styleUrl: './reset-pass.component.css'
})
export class ResetPassComponent {

  mandado = false
  username = '';
  private aunt = inject(LoginService);
  private router = inject(Router);
  private authService = inject(AuthService);
  readonly toast = inject(ToastrService)
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


  async enviar(): Promise<void> {
    this.mandado = true;
    
    this.aunt.reset(this.username).subscribe({
      next: (e) => {
        this.mandado = false;
        Swal.fire({
          title: 'Se ha enviado el código al correo',
          text: e.message,
          icon: 'success',
          showCancelButton: false,
        }).then((result) => {
          if (result.value) {
            window.location.reload();
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.mandado = false;
            Swal.fire('Cancelado', 'Se conserva el libro', 'error');
          }
        });
      },
      error: (err) => {
        this.mandado = false; // Restablecer estado en caso de error
        console.error('Error:', err); // Para depurar en la consola
        Swal.fire({
          title: 'Error',
          text:   'Usuario no encontrado , contacte al administrador',
          icon: 'error',
        });
      }
    });
  }
  

}
