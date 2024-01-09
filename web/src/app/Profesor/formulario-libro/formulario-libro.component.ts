import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LibroService } from '../libro.service';
import { AuthService } from '../../roles/auth.service';
import { CrearAutoresService } from '../crear-autores/crear-autores.service';
import { CarreraService } from '../../Administrador/carrera/carrera.service';
import { LibroTipoService } from './libro-tipo.service';

@Component({
  selector: 'app-libro-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './formulario-libro.component.html',
  styleUrls: ['./formulario-libro.component.css'],
})
export class FormularioLibroComponent implements OnInit {
  archivoSeleccionado: File | undefined;
  miFormulario: FormGroup;
  na = '';
  nas = '';
  autors: any;
  carrer: any;
  tipos: any;

  validator_titulo = ''
  validator_imagen = ''
  validator_descripcion = ''
  validator_fk_creador = ''
  validator_fk_autor = ''
  validator_fk_carrera = ''
  validator_tipo = ''
  validator_codigo = ''
  validator_editorial = ''
  validator_isbn = ''
  validator_archivo_ur = ''
  validator_palabras = ''

  tipo_selected = 'PDF';

  ngOnInit() {
    this.get_autor();
    this.get_carrera();
    this.get_tipos();
  }

  constructor(
    private libroService: LibroService,
    private formBuilder: FormBuilder,
    private Aunh: AuthService,
    private autor: CrearAutoresService,
    private Carrera: CarreraService,
    private Tipo: LibroTipoService
  ) {
    this.miFormulario = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.maxLength(50)]],
      imagen: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      fk_creador: [''],
      fk_autor: [''],
      fk_carrera: [''],
      tipo: ['', Validators.required],
      codigo: ['', Validators.required],
      editorial: ['', Validators.required],
      isbn: ['', Validators.required],
      archivo_url: [''],
      palabras: ['']
    });
  }

  cambio(value: Event) {
    const nombreAutor = (event.target as HTMLSelectElement).value;
    // me muero
    for (let ti of this.tipos) {
      if (ti.id_tipo == nombreAutor) {
        if (ti.nombre === 'PDF') {
          this.tipo_selected = 'PDF';
        } else if (ti.nombre === 'URL') {
          this.tipo_selected = 'URL';
        }
      }
    }
  }

  get descripcionControl(): FormControl {
    return this.miFormulario.get('descripcion') as FormControl;
  }

  // Método para obtener el estado de validez de la descripción
  get descripcionInvalid(): boolean {
    return (
      this.descripcionControl.hasError('maxlength') &&
      this.descripcionControl.touched
    );
  }

  get_autor() {
    this.autor.traer_autor().subscribe({
      next: (libros) => {
        this.autors = libros;
      },
      error: (error) => {
        console.error('Error al obtener libros:', error);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    });
  }
  get_carrera() {
    this.Carrera.traerTodas().subscribe({
      next: (libros) => {
        this.carrer = libros;
      },
      error: (error) => {
        console.error('Error al obtener libros:', error);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    }
    );
  }
  get_tipos() {
    this.Tipo.getLibro().subscribe({
      next: (tip) => {
        this.tipos = tip;
      },
      error: (error) => {
        console.error('Error al obtener libros:', error);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    });
  }
 

  // Método para obtener el estado de validez del título
  

  onFileSelected(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

  crearLibro() {



    const nuevoLibro = this.miFormulario.value;

    const creador = this.Aunh.getUserInfo();
    nuevoLibro.fk_creador = creador.id_user;

    // Verifica que los controles del formulario y las variables no sean nulos
    const controlFkAutor = this.miFormulario.get('fk_autor');
    const controlFkCarrera = this.miFormulario.get('fk_carrera');



    if (!controlFkAutor || !controlFkCarrera) {
      console.error(
        'Alguno de los controles (fk_autor o fk_carrera) no está disponible en el formulario.'
      );
      return;
    }

    nuevoLibro.fk_autor = controlFkAutor.value;

    nuevoLibro.fk_carrera = controlFkCarrera.value;

    // verificaciones

   
    
 
    

     var validado:boolean
     
    

  if (!nuevoLibro.titulo) {
    this.validator_titulo = 'campo requerido'
    console.error("eror falta titulo")
    validado = false
    
  }
  if (!nuevoLibro.imagen) {
    this.validator_imagen = 'campo requirido'
    console.error("eror falta titulo")
    validado = false
    
  }
  if (!nuevoLibro.descripcion) {
    this.validator_descripcion = 'requiere una descripcion'
    console.error("eror falta titulo")
    validado = false
    ;
  }
  
  if (!nuevoLibro.fk_autor) {
    console.error("eror falta titulo")
    this.validator_fk_autor = 'autor faltante'
    validado = false
    ;
  }
  if (!nuevoLibro.fk_carrera) {
    console.error("eror falta titulo")
    this.validator_fk_carrera = 'carrera faltante'
    validado = false
    ;
  }
  if (!nuevoLibro.tipo) {
    console.error("eror falta titulo")
  this.validator_tipo = 'tipo de libro requerido'
  validado = false

    ;
  }
  if (!nuevoLibro.codigo) {
    console.error("eror falta titulo")
    this.validator_codigo = 'codigo requerido'
    validado = false
    ;
  }
  
  if (!nuevoLibro.editorial) {
    console.error("eror falta titulo")
    this.validator_editorial = 'editorial requerida'
    validado = false
    ;
  }
  if (!nuevoLibro.isbn) {
    this.validator_isbn = 'isbn requerido'
    
    console.error("eror falta titulo")
    validado = false
    ;
  }
  // if (!nuevoLibro.archivo_url && nuevoLibro.tipo === 'URL') {
  //   this.validator_archivo_ur = ''
  //   validado = false

  //   console.error("eror falta titulo")
    
  // }
  if(!validado){
    return 
  }


 
 
 
    
    // Verifica si se ha seleccionado un archivo

    for (let ti of this.tipos) {
      if (ti.id_tipo == nuevoLibro.tipo) {
        if (this.archivoSeleccionado && ti.nombre === 'PDF') {
          // Llama al servicio para crear el libro
          this.libroService
            .crearLibro(nuevoLibro, this.archivoSeleccionado).subscribe(

              {
                next: (r) => (console.log(r)),

                error: (e) => { console.log(e) }
              }
            );
        } else if (ti.nombre === 'URL' && !this.archivoSeleccionado) {
          this.libroService
            .crearLibro(nuevoLibro, this.archivoSeleccionado)
            .subscribe(
              {
                next: (r) => (console.log(r)),

                error: (e) => { console.log(e) }

              }
            );
        } else if (!this.archivoSeleccionado) {
          console.error('Por favor, selecciona un archivo.');
          return;
        }
      }
    }
  }
}
