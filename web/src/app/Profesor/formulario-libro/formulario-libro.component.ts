import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LibrosService } from '../libro.service';

@Component({
  selector: 'app-formulario-libro',
  templateUrl: './formulario-libro.component.html',
  styleUrls: ['./formulario-libro.component.css']
})
export class FormularioLibroComponent {
  @Output() libroAgregado = new EventEmitter<void>();

  libroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private libroService: LibrosService,
    private router: Router
  ) {
    this.libroForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaPublicacion: ['', Validators.required],
      paginas: ['', Validators.required],
      materia: ['', Validators.required],
      carreras: ['', Validators.required],
      imagenUrl: ['', Validators.required]
    });
  }

  agregarLibro(): void {
    if (this.libroForm.invalid) {
      return;
    }

    const libro = {
      id: new Date().getTime(),
      titulo: this.libroForm.value.titulo,
      autor: this.libroForm.value.autor,
      descripcion: this.libroForm.value.descripcion,
      fechaPublicacion: this.libroForm.value.fechaPublicacion,
      paginas: this.libroForm.value.paginas,
      materia: this.libroForm.value.materia,
      carreras: this.libroForm.value.carreras,
      imagenUrl: this.libroForm.value.imagenUrl
    };

    this.libroService.agregarLibro(libro);
    this.libroForm.reset();
    this.libroAgregado.emit();

    // Mostrar mensaje y navegar a la pestaña del catálogo
    alert('Libro agregado');
    this.router.navigate(['/catalogo']);
  }
}