import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibroService } from '../libro.service';
import { ToastrService } from 'ngx-toastr';
import { EditarLibroService } from './editar-libro.service';
import { editar_libro } from './editar_libto';

@Component({
  selector: 'app-editar-libro',standalone: true,
  imports: [FormsModule, ReactiveFormsModule ],
  templateUrl: './editar-libro.component.html',
  styleUrls: ['./editar-libro.component.css']
})
export class EditarLibroComponent implements OnInit {
  libro_id: any;
  
  ngOnInit(): void {
    this.libro_id = this.route.snapshot.paramMap.get('id');
    
    this.libro_editar.getCarreras().subscribe((e)=>{
      this.carreras = e
      console.log(this.libro_id)
    })
  }
  private id = 1; // El ID que deseas enviar
  private archivo: File;
  private imagen: File;
  carreras
  libro:editar_libro

  constructor(private libro_editar: EditarLibroService) { }

  private route = inject( ActivatedRoute)
  onArchivoChange(event: any) {
    this.archivo = event.target.files[0];
  }

  onImagenChange(event: any) {
    this.imagen = event.target.files[0];
  }

  subirImagen() {
    if (this.archivo && this.imagen) {
      // Llama a tu servicio para enviar ambos archivos
      this.libro_editar.editarImagen(this.id, this.archivo, this.imagen ,this.libro)
        .subscribe((response) => {
          console.log('Respuesta del servidor:', response);
        });
    } else {
      console.error('Selecciona ambos archivos antes de subir.');
    }
  }

}
