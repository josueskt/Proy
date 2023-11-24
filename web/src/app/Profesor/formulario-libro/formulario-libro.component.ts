import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private libroService: LibrosService
  ) {
    this.libroForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      descripcion: ['', Validators.required]
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
      descripcion: this.libroForm.value.descripcion
    };
  
    this.libroService.agregarLibro(libro);
    this.libroForm.reset();
    this.libroAgregado.emit();
  }
}