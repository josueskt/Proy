import { Component, inject } from '@angular/core';
import { CrearAutoresService } from './crear-autores.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-autor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-autores.component.html',
  styleUrls: ['./crear-autores.component.css'],
})
export class CrearAutorComponent {
  Nombre = '';
  Alertabien: boolean = false;
  aut: any;

  private Autor = inject(CrearAutoresService);
  private toastrService: ToastrService = inject(ToastrService);

  ngOnInit() {
this.traerAutores();
  }

  traerAutores(){
    this.Autor.traer_autor().subscribe((autores) => {
      this.aut = autores;
    });
  }

  crearAutor() {
    if (this.Nombre != '') {
      this.Autor.crearAutor({ nombre: this.Nombre }).subscribe({
       next: () => {
          this.toastrService.success('Autor creado exitosamente', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.Alertabien = true;
          setTimeout(() => {
            window.location.reload();
            this.Alertabien = false;
          }, 1000);
        },
      error:  (error) => {
          this.toastrService.error('Error al crear Autor' , 'Fail', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }
       } );
    } else {
      this.toastrService.error('Faltan datos' , 'Fail', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
    }
  }

  borrar(id_autor: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Si elimina este Autor se eliminara con los libros que lo contenga',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.Autor.eliminar(id_autor).subscribe(() => {
          Swal.fire('OK', 'Autor eliminado', 'success');
          this.traerAutores();
          setTimeout(() => {
            window.location.reload();
          },600);
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'Se conserva el Autor', 'error');
      }
    });
  }
}
