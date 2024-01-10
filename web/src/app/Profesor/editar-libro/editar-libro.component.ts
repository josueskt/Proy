import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibroService } from '../libro.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-libro',standalone: true,
  imports: [FormsModule, ReactiveFormsModule ],
  templateUrl: './editar-libro.component.html',
  styleUrls: ['./editar-libro.component.css']
})
export class EditarLibroComponent implements OnInit {
  libroForm: FormGroup;
  libro: any;
  guardadoExitoso = false;

  constructor(

    private formBuilder: FormBuilder
  ) {
    this.libroForm = this.formBuilder.group({});
  }
  private route =inject(ActivatedRoute)
    private router=inject( Router)
    private libroService= inject(LibroService)
    private toastrService: ToastrService = inject(ToastrService);


  ngOnInit() {
    const libroId = Number(this.route.snapshot.params['id']);
    this.libroService.getLibro(libroId).subscribe(
      res => {
        this.toastrService.success('libro editado exitosamente', 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.libro = res;
        this.initializeForm();
      },
      error => {
        this.toastrService.error('Error al obtener libro' , 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  initializeForm() {
    this.libroForm = this.formBuilder.group({
      titulo: [this.libro.titulo, Validators.required],
      fechaPublicacion: [this.libro.fechaPublicacion, Validators.required],
      paginas: [this.libro.paginas, Validators.required],
      autor: [this.libro.autor, Validators.required],
      materia: [this.libro.materia, Validators.required],
      carreras: [this.libro.carreras, Validators.required],
      descripcion: [this.libro.descripcion, Validators.required],
      imagenUrl: [this.libro.imagenUrl, Validators.required]
    });
  }

  guardarCambios() {
    if (this.libroForm.valid) {
      const updatedLibro = { ...this.libro, ...this.libroForm.value };
      this.libroService.editarLibro(this.libro.id, updatedLibro).subscribe(
        res => {
          this.toastrService.success('Libro guardado con exito', 'Success', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
          this.guardadoExitoso = true;
          this.router.navigate([`/profe/libros/${this.libro.id}`]); // Cambia la ruta según tu estructura de rutas
        },
        error => {
          this.toastrService.error('Error al editar libro' , 'Fail', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
          // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
        }
      );
    }
  }
}
