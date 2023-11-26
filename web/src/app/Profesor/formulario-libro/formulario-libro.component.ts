import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibroService } from '../libro.service';

@Component({
  selector: 'app-libro-form',
  templateUrl: './formulario-libro.component.html',
  styleUrls: ['./formulario-libro.component.css'],
})
export class FormularioLibroComponent {
  libroForm: FormGroup;

  constructor(private fb: FormBuilder, private libroService: LibroService) {
    this.libroForm = this.fb.group({
      titulo: ['', Validators.required],
      imagen: ['', Validators.required],
      descripcion: ['', Validators.required],
      num_paginas: ['', Validators.required],
      fk_creador: ['', Validators.required],
      fk_autor: ['', Validators.required],
      fk_carrera: ['', Validators.required],
      archivo: [null, Validators.required], // Asegúrate de que coincida con el campo en el servicio
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files.length > 0 ? event.target.files[0] : null;
    this.libroForm.patchValue({ archivo: file });
  }

  onSubmit() {
    if (this.libroForm.valid) {
      const libro = this.libroForm.value;

      // TODO: Implementa lógica para obtener el token de autenticación
      const token = 'tu_token_aqui'; // Reemplaza con tu implementación real para obtener el token

      this.libroService.crearLibro(libro, token).subscribe(
        (response) => {
          console.log('Libro creado con éxito', response);
          // Aquí podrías redirigir o realizar otras acciones después de la creación exitosa
        },
        (error) => {
          console.error('Error al crear el libro', error);
          // Manejo de errores
        }
      );
    } else {
      console.log('Formulario inválido');
      // Puedes mostrar mensajes de error o realizar otras acciones según tus necesidades
    }
  }
}
