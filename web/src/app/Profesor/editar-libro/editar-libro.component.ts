import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditarLibroService } from './editar-libro.service';
import { editar_libro } from './editar_libto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-libro',standalone: true,
  imports: [FormsModule, ReactiveFormsModule ],
  templateUrl: './editar-libro.component.html',
  styleUrls: ['./editar-libro.component.css']
})
export class EditarLibroComponent implements OnInit {
  private libro_id: string;
  libro:editar_libro
  private archivo: File;
  private imagen: File;
  private toastrService =inject(ToastrService)
  private router= inject( Router)
  carreras
 
  ngOnInit(): void {
    this.libro_id = this.route.snapshot.paramMap.get('id');
    
    this.libro_editar.getCarreras().subscribe((e)=>{
      this.carreras = e
    
    })
    this.libro_editar.traer_libro(this.libro_id).subscribe((e:editar_libro)=>{

     
      this.libro =  e[0]
      this.agarre()
      
    })
    this.agarre()
    
   
  }
 
  
 
 agarre() {
  for (const carrera of this.carreras) {
    
    if (carrera.nombre === this.libro.carrera) {
      this.libro.carrera = carrera.id_carrera;
    }
  }
}

  constructor(private libro_editar: EditarLibroService) { }

  private route = inject( ActivatedRoute)
  onArchivoChange(event: any) {
    this.archivo = event.target.files[0];
  }

  onImagenChange(event: any) {
    this.imagen = event.target.files[0];
  }

  subirImagen() {
    this.agarre()
      // Llama a tu servicio para enviar ambos archivos
      this.libro_editar.editarImagen(this.libro_id, this.archivo, this.imagen ,this.libro)  .subscribe({
        next: (data:{"message":string}) => {
           this.toastrService.success(data.message, 'Success', {
             timeOut: 3000,
             positionClass: 'toast-top-center',
             
           });
           setTimeout(() => {
             this.router.navigate(['/profe']);
          }, 2000);
         },
        error: (error) => {
           this.toastrService.error(error.error.message, 'Fail', {
             timeOut: 3000,
             positionClass: 'toast-top-center',
            } );
         }
   });
       

 
  }

}
