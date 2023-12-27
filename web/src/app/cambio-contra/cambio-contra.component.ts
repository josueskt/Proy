import { Component, inject } from '@angular/core';
import { CambioContraService } from './cambio-contra.service';
import { AuthService } from '../roles/auth.service';

@Component({
  selector: 'app-cambio-contra',
  templateUrl: './cambio-contra.component.html',
  styleUrls: ['./cambio-contra.component.css']
})
export class CambioContraComponent {
  datos: { id: string, contra: string } = { id: '', contra: '' };
 mensaje :string | undefined 
 mensaje_2 :string | undefined 

 private cambio_pas= inject( CambioContraService)
 private Aunth = inject(AuthService)

  cambio_contra() {
    if (!this.datos) {
      alert("Falta información");
    } else {
      const asd = this.Aunth.getUserInfo();
      this.datos.id = asd.id_user;

      // Validar la contraseña
      if (this.validarContrasena(this.datos.contra)) {
        this.cambio_pas.password(this.datos).subscribe(
          () => {
            this.mensaje_2 = "Contraseña Actualizada"
           this.datos.contra =""
          },
          (error) => {
            console.error('Error al cambiar la contraseña:', error);
            // Maneja el error según tus necesidades
          }
        );
      } else {
        this.mensaje = 'requiere un caracter en mayuscula , minuscula , caracter especial 8 caracteres minimo'
      }
    }
  }

  validarContrasena(contrasena: string): boolean {
    // Expresión regular para validar la contraseña
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
    return regex.test(contrasena);
  }
}
