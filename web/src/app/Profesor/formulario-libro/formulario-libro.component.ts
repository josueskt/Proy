import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibroService } from '../libro.service';
import { AuthService } from 'src/app/roles/auth.service';

@Component({
  selector: 'app-libro-form',
  templateUrl: './formulario-libro.component.html',
  styleUrls: ['./formulario-libro.component.css'],
})
export class FormularioLibroComponent {
  archivoSeleccionado: File | undefined;
  miFormulario: FormGroup;

  

  constructor(private libroService: LibroService, private formBuilder: FormBuilder , private Aunh:AuthService) {
    this.miFormulario = this.formBuilder.group({
      titulo: ['', Validators.required],
      imagen: ['', Validators.required],
      descripcion: ['', Validators.required],
      num_paginas: ['', Validators.required],
      fk_creador: [''],
      fk_autor: ['', Validators.required],
      fk_carrera: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

  crearLibro() {
    if (this.miFormulario.invalid) {
      console.error('Por favor, completa todos los campos del formulario.');
      return;
    }

    const nuevoLibro = this.miFormulario.value;
  const creador = this.Aunh.getUserInfo()
  nuevoLibro.fk_creador = creador.id_user
    // Verifica si se ha seleccionado un archivo
    if (!this.archivoSeleccionado) {
      console.error('Por favor, selecciona un archivo.');
      return;
    }

    // Llama al servicio para crear el libro
    this.libroService.crearLibro(nuevoLibro, this.archivoSeleccionado).subscribe(
      response => {
        console.log(response.message);
        console.log(response.newFileName);
        // Aquí podrías realizar acciones adicionales después de crear el libro, como redireccionar a otra página.
      },
      error => {
        console.error('Error al crear el libro:', error);
      }
    );
  }
}
