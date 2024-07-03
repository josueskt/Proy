import { Component, inject } from '@angular/core';
import { CambioContraService } from './cambio-contra.service';
import { AuthService } from '../roles/auth.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Cambio_contra } from '../interfaces/cambio_contra.interface';

@Component({
  selector: 'app-cambio-contra',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cambio-contra.component.html',
  styleUrls: ['./cambio-contra.component.css']
})
export class CambioContraComponent {
 datos: Cambio_contra= { id: '', contra: '', repeatContra: '' };
 showPassword: boolean = false;
 showPassword2: boolean = false;


 private cambio_pas= inject( CambioContraService)
 private Aunth = inject(AuthService)
 private toastrService: ToastrService = inject(ToastrService);
 private router: Router = inject(Router);

  cambio_contra() {
    if (!this.datos) {
      alert("Falta información");
    } else {
      const asd = this.Aunth.getUserInfo();
      this.datos.id = asd.id_user;

      if(this.datos.contra !== this.datos.repeatContra) {
        this.toastrService.error('Las contraseñas deben ser iguales', 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        return;
      }

      // Validar la contraseña
      if (this.validarContrasena(this.datos.contra)) {
        this.cambio_pas.password(this.datos).subscribe({
         next: () => {
            this.toastrService.success('Contraseña Actualizada', 'OK', {
              timeOut: 3000, positionClass: 'toast-top-center'
            });
            this.volver();
          },
         error: (error) => {
            this.toastrService.error(error.error.message, 'Fail', {
              timeOut: 3000,  positionClass: 'toast-top-center',
            });
          }
      });
      } else {
        this.toastrService.error('requiere un caracter en mayuscula , minuscula , caracter especial , 8 caracteres minimo', 'Fail', {
          timeOut: 6000,  positionClass: 'toast-top-center',
        });
      }
    }
  }

  volver(): void {
    this.router.navigate(['/user']);
  }

  validarContrasena(contrasena: string): boolean {
    // Expresión regular para validar la contraseña
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
    return regex.test(contrasena);
  }

  showHidePassword() {
    this.showPassword = !this.showPassword;
  }

  showHidePassword2() {
    this.showPassword2 = !this.showPassword2;
  }
}
