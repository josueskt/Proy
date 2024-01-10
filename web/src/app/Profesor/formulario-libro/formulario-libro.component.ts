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
import { ToastrService } from 'ngx-toastr';

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
    private Tipo: LibroTipoService,
    private toastrService: ToastrService
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
    });
  }

  cambio(value: Event) {
    const nombreAutor = (event.target as HTMLSelectElement).value;
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


  get descripcionInvalid(): boolean {
    return (
      this.descripcionControl.hasError('maxlength') &&
      this.descripcionControl.touched
    );
  }

  get_autor() {
    this.autor.traer_autor().subscribe(
      (libros) => {
        this.autors = libros;
      },
      (error) => {
        this.toastrService.error('Error al obtener autores' , 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }
  get_carrera() {
    this.Carrera.traerTodas().subscribe(
      (libros) => {
        this.carrer = libros;
      },
      (error) => {
        this.toastrService.error('Error al obtener carreras' , 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }
  get_tipos() {
    this.Tipo.getLibro().subscribe(
      (tip) => {
        this.tipos = tip;
      },
      (error) => {
        this.toastrService.error('Error al obtener libros' , 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }
  get tituloControl(): FormControl {
    return this.miFormulario.get('titulo') as FormControl;
  }

  // Método para obtener el estado de validez del título
  get tituloInvalid(): boolean {
    return (
      this.tituloControl.hasError('required') && this.tituloControl.touched
    );
  }

  onFileSelected(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

  crearLibro() {
    if (this.miFormulario.invalid) {
      this.toastrService.error('Por favor, completa todos los campos del formulario.' , 'Fail', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });

      return;
    }

    const nuevoLibro = this.miFormulario.value;

    const creador = this.Aunh.getUserInfo();
    nuevoLibro.fk_creador = creador.id_user;

    // Verifica que los controles del formulario y las variables no sean nulos
    const controlFkAutor = this.miFormulario.get('fk_autor');
    const controlFkCarrera = this.miFormulario.get('fk_carrera');

    if (!controlFkAutor || !controlFkCarrera) {
      this.toastrService.error('Alguno de los controles (fk_autor o fk_carrera) no está disponible en el formulario.' , 'Fail', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
      return;
    }

    nuevoLibro.fk_autor = controlFkAutor.value;

    nuevoLibro.fk_carrera = controlFkCarrera.value;

    // Verifica si se ha seleccionado un archivo

    for (let ti of this.tipos) {
      if (ti.id_tipo == nuevoLibro.tipo) {
        if (this.archivoSeleccionado && ti.nombre === 'PDF') {
          // Llama al servicio para crear el libro
          this.libroService
            .crearLibro(nuevoLibro, this.archivoSeleccionado)
            .subscribe(
              (data) => {
                this.toastrService.success(data.response.message, 'Success', {
                  timeOut: 3000,
                  positionClass: 'toast-top-center',
                });
              },
              (error) => {
                this.toastrService.error(error.error.message, 'Fail', {
                  timeOut: 3000,
                  positionClass: 'toast-top-center',
                });
              }
            );
        } else if (ti.nombre === 'URL' && !this.archivoSeleccionado) {
          this.libroService
            .crearLibro(nuevoLibro, this.archivoSeleccionado)
            .subscribe(
              (data) => {
                this.toastrService.success(data.response.message, 'Success', {
                  timeOut: 3000,
                  positionClass: 'toast-top-center',
                });
              },
              (error) => {
                this.toastrService.error(error.error.message, 'Fail', {
                  timeOut: 3000,
                  positionClass: 'toast-top-center',
                });
              }
            );
        } else if (!this.archivoSeleccionado) {
          this.toastrService.error('Por Favor selecciona un archivo', 'Fail', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
          return;
        }
      }
    }
  }
}
