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
import { Router } from '@angular/router';
import { maxLengthPerWordValidator } from './palabrasclave.validator';

@Component({
  selector: 'app-libro-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './formulario-libro.component.html',
  styleUrls: ['./formulario-libro.component.css'],
})
export class FormularioLibroComponent implements OnInit {
  archivoSeleccionado: File | undefined;
  imagenSeleccionado: File | undefined;
  miFormulario: FormGroup;
  na = '';
  nas = '';
  autors: any;
  carrer: any;
  tipos: any;
  imagen

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

load = true
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
    private toastrService: ToastrService,
    private router : Router
  ) {
    this.miFormulario = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      tipoImagen: ['1', Validators.required],
      imagen: [''],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      fk_creador: [''],
      fk_autor: [''],
      fk_carrera: ['',[Validators.required]],
      tipo: ['2', Validators.required],
      codigo: [],
      editorial: ['', Validators.required],
      isbn: ['', Validators.required],
      archivo_url: [''],
      palabras: ['', [maxLengthPerWordValidator(50)]],
      cantidad:[''],
      year:['']
    });
  }


  get palabrasControl() {
    return this.miFormulario.get('palabras');
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
         else if (ti.nombre === 'FISICO') {
          this.tipo_selected = 'FISICO';
        }
      }
    }
  }

  cambioImagen(value: Event) {
    const nombreAutor = (event.target as HTMLSelectElement).value;

    this.imagen = nombreAutor

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
    this.autor.traer_autor().subscribe({
      next: (libros) => {
        this.autors = libros;
      },
     error: (error) => {
        this.toastrService.error('Error al obtener autores' , 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    });
  }
  get_carrera() {
    this.Carrera.traerTodas().subscribe({
      next: (libros) => {
        this.carrer = libros;
      },
      error:(error) => {
        this.toastrService.error('Error al obtener carreras' , 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
     } );
  }
  get_tipos() {
    this.Tipo.getLibro().subscribe({
      next: (tip) => {
        this.tipos = tip;
      },
      error:(error) => {
        this.toastrService.error('Error al obtener libros' , 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    });
  }


  // Método para obtener el estado de validez del título


  onFileSelected(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

  // onFileSelected(event: any): void {
  //   // Almacenar el archivo seleccionado en la propiedad archivoSeleccionado
  //   this.archivoSeleccionado = event.target.files[0];

  //   // Verificar que el archivo sea un PDF
  //   if (!this.archivoSeleccionado || !this.archivoSeleccionado.name.endsWith('.pdf')) {
  //     return;
  //   }

  //   // Leer los primeros 1024 bytes del archivo para buscar encriptación
  //   const reader = new FileReader();

  //   reader.onload = (e: any) => {
  //     const fileData = new Uint8Array(e.target.result);

  //     // Comprobar si los primeros bytes corresponden a "%PDF"
  //     const pdfMagicNumber = [0x25, 0x50, 0x44, 0x46]; // '%PDF'
  //     let isValidPdf = true;
  //     for (let i = 0; i < pdfMagicNumber.length; i++) {
  //       if (fileData[i] !== pdfMagicNumber[i]) {
  //         isValidPdf = false;
  //         break;
  //       }
  //     }

  //     if (!isValidPdf) {
  //       alert("El archivo no es un PDF válido.");
  //       return;
  //     }

  //     // Buscar por posibles indicadores de encriptación o protección
  //     // En un PDF encriptado, podría haber un campo "/Encrypt"
  //     let encryptionFound = false;
  //     let encryptionIndex = fileData.indexOf(0x2F); // Buscar '/'
      
  //     while (encryptionIndex !== -1) {
  //       const str = String.fromCharCode.apply(null, fileData.slice(encryptionIndex, encryptionIndex + 8)); // Leemos 8 caracteres después del '/'
  //       if (str.indexOf('Encrypt') !== -1) {
  //         encryptionFound = true;
  //         break;
  //       }
  //       encryptionIndex = fileData.indexOf(0x2F, encryptionIndex + 1); // Buscar la siguiente '/'
  //     }

  //     if (encryptionFound) {
  //       alert("El PDF está encriptado o protegido contra escritura.");
  //     } else {
  //   this.imagenSeleccionado = event.target.files[0];

  //     }
  //   };

  //   // Leer los primeros 1024 bytes del archivo
  //   reader.readAsArrayBuffer(this.archivoSeleccionado.slice(0, 1024));
  // }

  
  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  
  //   // Validar si el archivo es un PDF
  //   if (file && file.type === 'application/pdf') {
  //     const reader = new FileReader();
  
  //     reader.onload = async (e: any) => {
  //       const fileBuffer = e.target.result;
  
  //       try {
  //         // Cargar el documento PDF usando pdfjs-dist
  //         const loadingTask = pdfjsLib.getDocument(new Uint8Array(fileBuffer));
          
  //         loadingTask.onPassword = (callback) => {
  //           // Si el PDF está protegido por contraseña, le damos una contraseña vacía
  //           callback('');
  //         };
  
  //         // Intentar obtener el documento PDF
  //         const pdfDocument = await loadingTask.promise;
  
  //         // Si el PDF se carga correctamente, significa que no está encriptado
  //         this.archivoSeleccionado = file;
  //         alert('Archivo PDF válido y sin restricciones.');
  //       } catch (error) {
  //         // Si ocurre un error, puede ser debido a encriptación o corrupción del archivo
  //         if (error.name === 'PasswordException') {
  //           alert('El archivo PDF está encriptado y requiere una contraseña.');
  //         } else if (error.name === 'InvalidPDFException') {
  //           alert('El archivo PDF está corrupto o es inválido.');
  //         } else {
  //           alert('Hubo un error al procesar el PDF. Error: ' + error.message);
  //         }
  //       }
  //     };
      
  //     reader.readAsArrayBuffer(file);
  //   } else {
  //     alert('Por favor, selecciona un archivo PDF.');
  //   }
  // }
  onImageSelected(event: any) {
    this.imagenSeleccionado = event.target.files[0];
  }

  crearLibro() {
    if(this.miFormulario.invalid){

      this.toastrService.info('Por favor , rellene todos los campos', 'campos faltantes', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });

      return
    }
this.load = false
    const nuevoLibro = this.miFormulario.value;
    const creador = this.Aunh.getUserInfo();
    nuevoLibro.fk_creador = creador.id_user;
    const controlFkAutor = this.miFormulario.get('fk_autor');
    const controlFkCarrera = this.miFormulario.get('fk_carrera');
    nuevoLibro.fk_autor = controlFkAutor.value;
    nuevoLibro.fk_carrera = controlFkCarrera.value;
    for (let ti of this.tipos) {
      if (ti.id_tipo == nuevoLibro.tipo) {
        if(ti.nombre ==='FISICO'){
          this.libroService
          .crearLibro(nuevoLibro, this.archivoSeleccionado , this.imagenSeleccionado)
          .subscribe({next:
            (e) => {
              this.toastrService.success('Libro creado exitosamente', 'Success', {
                timeOut: 3000,
                positionClass: 'toast-top-center',
              });
              console.log(e)
            this.router.navigate(['/profe']);
            },
            error:(error) => {
              this.toastrService.error(error.error.message, 'Fail', {
                timeOut: 3000,
                positionClass: 'toast-top-center',
              });
            }
           } );

        }else
        if (this.archivoSeleccionado && ti.nombre === 'PDF') {
          this.libroService
            .crearLibro(nuevoLibro, this.archivoSeleccionado,this.imagenSeleccionado)
            .subscribe({next:
              (e) => {if(e.error){
                this.load = true
                this.toastrService.error(e.error, 'Error', {
                  timeOut: 3000,
                  positionClass: 'toast-top-center',
                });
                
              }else{
                this.toastrService.success('Libro creado exitosamente', 'Success', {
                  timeOut: 3000,
                  positionClass: 'toast-top-center',
                });
                this.router.navigate(['/profe']);
              }


               

              },
              error:(error) => {
                this.toastrService.error(error.error.message, 'Fail', {
                  timeOut: 3000,
                  positionClass: 'toast-top-center',
                });
              }
             } );
        }
         else if (ti.nombre === 'URL' && !this.archivoSeleccionado) {
          if (!nuevoLibro.archivo_url) {
            this.validator_archivo_ur = 'ulr del archivo requerido'
            this.toastrService.error('Url requerida', 'Fail', {
              timeOut: 3000,
              positionClass: 'toast-top-center',
            });

           return
          }
            ;
          this.libroService
            .crearLibro(nuevoLibro, this.archivoSeleccionado,this.imagenSeleccionado)
            .subscribe({
             next: (data) => {
                this.toastrService.success(data.message, 'Success', {
                  timeOut: 3000,
                  positionClass: 'toast-top-center',
                });
               this.router.navigate(['/profe']);
              },
             error: (error) => {
                this.toastrService.error(error.error.message, 'Fail', {
                  timeOut: 3000,
                  positionClass: 'toast-top-center',
                 } );
              }
        });
      }
         else if (!this.archivoSeleccionado ) {
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
