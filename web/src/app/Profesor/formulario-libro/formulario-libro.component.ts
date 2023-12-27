import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LibroService } from '../libro.service';
import { AuthService } from 'src/app/roles/auth.service';
import { CrearAutoresService } from '../crear-autores/crear-autores.service';
import { CarreraService } from 'src/app/Administrador/carrera/carrera.service';

@Component({
  selector: 'app-libro-form',
  templateUrl: './formulario-libro.component.html',
  styleUrls: ['./formulario-libro.component.css'],
})
export class FormularioLibroComponent implements OnInit {
  archivoSeleccionado: File | undefined;
  miFormulario: FormGroup;
  na = ""
  nas = ""
  autors: any
  carrer: any

  ngOnInit() {
    this.get_autor()
    this.get_carrera()
  }

  constructor(private libroService: LibroService, private formBuilder: FormBuilder, private Aunh: AuthService, private autor: CrearAutoresService, private Carrera: CarreraService) {
    this.miFormulario = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.maxLength(50)]],
      imagen: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      num_paginas: [''],
      fk_creador: [''],
      fk_autor: [''],
      fk_carrera: [''],
    });
  }
  get numPaginasControl(): FormControl {
    return this.miFormulario.get('num_paginas') as FormControl;
  }

  // Método para obtener el estado de validez del número de páginas
  get numPaginasInvalid(): boolean {
    return (
      (this.numPaginasControl.hasError('pattern') || this.numPaginasControl.hasError('min') || this.numPaginasControl.hasError('max')) &&
      this.numPaginasControl.touched
    );
  }
  get descripcionControl(): FormControl {
    return this.miFormulario.get('descripcion') as FormControl;
  }

  // Método para obtener el estado de validez de la descripción
  get descripcionInvalid(): boolean {
    return this.descripcionControl.hasError('maxlength') && this.descripcionControl.touched;
  }


  get_autor() {
    this.autor.traer_autor().subscribe(
      (libros) => {
        this.autors = libros;
      
      },
      error => {
        console.error('Error al obtener libros:', error);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    );

  }
  get_carrera() {
    this.Carrera.traerTodas().subscribe(
      (libros) => {
        this.carrer = libros;
        
      },
      error => {
        console.error('Error al obtener libros:', error);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    );

  }
  get tituloControl(): FormControl {
    return this.miFormulario.get('titulo') as FormControl;
  }

  // Método para obtener el estado de validez del título
  get tituloInvalid(): boolean {
    return this.tituloControl.hasError('required') && this.tituloControl.touched;
  }


  onFileSelected(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

  crearLibro() {
    if (this.miFormulario.invalid) {
      alert('Por favor, completa todos los campos del formulario.');
      return;
    }

    const nuevoLibro = this.miFormulario.value;

    const creador = this.Aunh.getUserInfo();
    nuevoLibro.fk_creador = creador.id_user;

    // Verifica que los controles del formulario y las variables no sean nulos
    const controlFkAutor = this.miFormulario.get('fk_autor');
    const controlFkCarrera = this.miFormulario.get('fk_carrera');

    if (!controlFkAutor || !controlFkCarrera) {
      console.error('Alguno de los controles (fk_autor o fk_carrera) no está disponible en el formulario.');
      return;
    }

    nuevoLibro.fk_autor = controlFkAutor.value;


    nuevoLibro.fk_carrera = controlFkCarrera.value;


    // Verifica si se ha seleccionado un archivo
    if (!this.archivoSeleccionado) {
      console.error('Por favor, selecciona un archivo.');
      return;
    }

    // Llama al servicio para crear el libro
    this.libroService.crearLibro(nuevoLibro, this.archivoSeleccionado).subscribe(
      () => {
        alert("libro creado")

      },
      error => {
        console.error('Error al crear el libro:', error);
      }
    );
  }
}
