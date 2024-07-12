import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DevolucionesService } from './devoluciones.service';
import { libro_devolicion } from '../../interfaces/libro_devolucion.interface';

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
      alert(r.message[0])
      window.location.reload()
    },
    error:(e)=>{
      console.log(e)
      alert(e.message[0])

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
