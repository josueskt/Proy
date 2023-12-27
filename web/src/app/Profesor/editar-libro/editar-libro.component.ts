import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibroService } from '../libro.service';

@Component({
  selector: 'app-editar-libro',
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

  ngOnInit() {
    const libroId = Number(this.route.snapshot.params['id']);
    this.libroService.getLibro(libroId).subscribe(
      res => {
        this.libro = res;
        this.initializeForm();
      },
      error => {
        console.error('Error al obtener el libro:', error);
        // Aquí puedes manejar el error, por ejemplo, redirigir a una página de error
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
          // Aquí puedes agregar lógica adicional, como navegar a la página de detalles del libro actualizado
          this.guardadoExitoso = true;
          this.router.navigate([`/libros/${this.libro.id}`]); // Cambia la ruta según tu estructura de rutas
        },
        error => {
          console.error('Error al editar el libro:', error);
          // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
        }
      );
    }
  }
}
