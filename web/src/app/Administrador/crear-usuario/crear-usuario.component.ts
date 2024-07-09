import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CrearUsuarioserviceService } from './crear-usuarioservice.service';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  private toastrService: ToastrService = inject(ToastrService);
private register = inject(CrearUsuarioserviceService)
  usuario: {email: string, fk_rol: number, nombre: string, password: string, cedula: string};

  ngOnInit(): void {
    this.usuario = { email: "", fk_rol: 3, nombre: "", password: "", cedula: "" };
  }

  onSubmit() {
  
    


    if (this.isValidEmail(this.usuario.email) && this.isValidPassword(this.usuario.password) && this.usuario.nombre !== "" && this.usuario.cedula !== "") {
      this.toastrService.success('Usuario Creado', 'OK', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
  
      
this.register.crearUsuario(this.usuario).subscribe((e)=>{
console.log(e)
this.toastrService.error(e.message, 'Error', {
  timeOut: 3000,
  positionClass: 'toast-top-center',
});

})
    console.log(this.usuario)
    } else {
      this.toastrService.error('Por favor, rellene todos los campos correctamente', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).+$/;
    return password.length >= 8 && passwordRegex.test(password);
  }
}
