import { Component, inject } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CambioContraService } from '../../cambio-contra/cambio-contra.service';
import { Cambio_contra } from '../../interfaces/cambio_contra.interface';
import { AuthService } from '../../roles/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-restablecer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './restablecer.component.html',
  styleUrl: './restablecer.component.css'
})
export class RestablecerComponent {
  token: string | null = null;
  private aunt = inject(LoginService);
  private route = inject(ActivatedRoute)

  datos = {  contra: '', repeatContra: '' };
  showPassword: boolean = false;
  showPassword2: boolean = false;


  private cambio_pas = inject(CambioContraService)
  private Aunth = inject(AuthService)
  private toastrService: ToastrService = inject(ToastrService);
  private router: Router = inject(Router);

  verificado = true
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.token = params['id'];
      this.aunt.restablecer(this.token).subscribe((e) => {
        if (!e[0]) {
          this.verificado = false

        }
      })
    });
  }


  cambio_contra() {
    if (!this.datos) {
      alert("Falta información");
    } else {

      if (this.datos.contra !== this.datos.repeatContra) {
        this.toastrService.error('Las contraseñas deben ser iguales', 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        return;
      }
      if (this.validarContrasena(this.datos.contra)) {
        this.aunt.confirmarRestablecer(this.token,this.datos).subscribe({
          next: (e:any) => {
            if(e.error){

              this.toastrService.error(e.error, 'Eror', {
                timeOut: 3000, positionClass: 'toast-top-center'
              });

            }else{
              this.toastrService.success('Contraseña Actualizada', 'OK', {
                timeOut: 3000, positionClass: 'toast-top-center'
              });
              this.volver();
            }

            
          },
          error: (error) => {
            this.toastrService.error(error.error.message, 'Fail', {
              timeOut: 3000, positionClass: 'toast-top-center',
            });
          }
        });
      } else {
        this.toastrService.error('requiere un caracter en mayuscula , minuscula , caracter especial , 8 caracteres minimo', 'Fail', {
          timeOut: 6000, positionClass: 'toast-top-center',
        });
      }
    }
  }
  volver(): void {
    this.router.navigate(['/user']);
    this.Aunth.clearToken()
  }
  validarContrasena(contrasena: string): boolean {
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


