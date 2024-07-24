import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DevolucionesService } from './devoluciones.service';
import { libro_devolicion } from '../../interfaces/libro_devolucion.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-devoluciones',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './devoluciones.component.html',
  styleUrl: './devoluciones.component.css'
})
export class DevolucionesComponent {

  showModal:boolean = false
  libros:libro_devolicion[] = []
  
  devolucion:{observacion:string,id_prestamo:string ,fk_libro:string} = {observacion:'',id_prestamo:'', fk_libro:''}
private devolucion_s = inject(DevolucionesService)
private toastrService = inject(ToastrService)
closeModal(){

  this.showModal = false
}
openModal(id_prestamo:string,fk_libro:string){

  this.showModal = true
  this.devolucion.id_prestamo = id_prestamo
  this.devolucion.fk_libro = fk_libro
}

devolver(){

  this.devolucion_s.devolver_prestamo(this.devolucion).subscribe({
    next:(r:any)=>{
      this.toastrService.success(r.message[0], 'Success', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
      
      // Espera 3 segundos (3000 milisegundos) antes de recargar la página
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    },
    error:(e)=>{
      console.log(e)
    
      this.toastrService.success(e.message[0], 'Success', {
        timeOut: 1000,
        positionClass: 'toast-top-center',
      });

    }
  })
}
  buscar_prestamo(event: KeyboardEvent){


    const valorInput = (event.target as HTMLInputElement).value;
this.devolucion_s.obtener_codigo_de_Devolucion(valorInput).subscribe({
  next:(e:any)=>{
    console.log(e)
    this.libros = e
  },
  error:(e)=>{
    console.log(e)
  }
})
  }

}
