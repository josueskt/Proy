import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditarLibroService } from './editar-libro.service';
import { editar_libro } from './editar_libto';
import { ToastrService } from 'ngx-toastr';
import { maxLengthPerWordValidator } from '../formulario-libro/palabrasclave.validator';
@Component({
  selector: 'app-editar-libro', standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './editar-libro.component.html',
  styleUrls: ['./editar-libro.component.css']
})
export class EditarLibroComponent implements OnInit {
  private libro_id: string;
  libro: editar_libro
  private archivo: File;
  private imagen: File;
  private toastrService = inject(ToastrService)
  private router = inject(Router)
  carreras
  palabras
  libroForm: FormGroup;
  load = true

  async ngOnInit(): Promise<void> {
    


    this.libroForm = new FormGroup({
      titulo: new FormControl('', [Validators.required ,Validators.maxLength(100)]),
      codigo: new FormControl(''),
      editorial: new FormControl(''),
      isbn: new FormControl('', Validators.required),
      year_of_publication: new FormControl('', Validators.required),
      review: new FormControl('', [Validators.maxLength(500)]),
      carrera: new FormControl('', Validators.required),
      palabras: new FormControl('',[maxLengthPerWordValidator(50)]),
      id_libro: new FormControl('', Validators.required),
      cantidad :new FormControl(''),
      categoria :new FormControl(''),
      autor :new FormControl('',[maxLengthPerWordValidator(200)]),
    });



    this.libro_id = await this.route.snapshot.paramMap.get('id');

    this.libro_editar.getCarreras().subscribe((e) => {
      this.carreras = e

    })
    await this.libro_editar.traer_libro(this.libro_id).subscribe((e: editar_libro) => {
      this.libro = e[0]
     
      this.libroForm.setValue(
        {
          id_libro:this.libro_id,
          titulo: this.libro.titulo,
          codigo: this.libro.codigo,
          editorial: this.libro.editorial,
          isbn: this.libro.isbn,
          year_of_publication: this.libro.year_of_publication,
          review: this.libro.review,
          carrera: this.libro.carrera,
          palabras: '',
          cantidad: this.libro.cantidad,
          categoria:this.libro.categoria,
          autor:this.libro.autor
        }
      )
      this.palabras = e.palabras
      this.agarre()
    })
  }

  agarre() {
    for (const carrera of this.carreras) {

      if (carrera.nombre === this.libro.carrera) {
        this.libroForm.get('carrera').setValue( carrera.id_carrera);
      }
    }
  }

  eliminar(id, index) {
    this.palabras.pop(index)
    this.libro_editar.eliminarP(id).subscribe((e) => { console.log(e) })
  }



  constructor(private libro_editar: EditarLibroService) { }

  private route = inject(ActivatedRoute)
  onArchivoChange(event: any) {
    this.archivo = event.target.files[0];
  }

  onImagenChange(event: any) {
    this.imagen = event.target.files[0];
  }

  subirImagen() {
    this.load = false
    this.libro_editar.editarImagen(this.libro_id, this.archivo, this.imagen, this.libroForm.value).subscribe({
      next: (data: { "message": string }) => {
        this.toastrService.success(data.message, 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-center',

        });
        setTimeout(() => {
          if(this.libro.tipo === "FISICO"){
            this.router.navigate(['/biblioteca/inventario']);

          }else{

            this.router.navigate(['/profe']);
          }
        }, 100);
      },
      error: (error) => {
        this.load = true
        this.toastrService.error(error.error.message, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    });



  }

}
