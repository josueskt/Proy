import { Component, Input, OnInit, inject } from '@angular/core';
import { LibroService } from '../libro.service';
import { AuthService } from '../../roles/auth.service';

import { RouterModule } from '@angular/router';
import { VistalibroService } from '../../usuario/vistalibro/vistalibro.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-catalogo-libros',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './catalogo-libros.component.html',
  styleUrls: ['./catalogo-libros.component.css']
})
export class CatalogoLibrosComponent implements OnInit {
  @Input() libros: any[] = [];
  userInfo: any;
  nombre='asdasd';

  private libroService = inject( LibroService )
  private auht =inject(AuthService)
  private libro_des =inject( VistalibroService)
  private toastrService: ToastrService = inject(ToastrService);

  ngOnInit() {
    this.userInfo = this.auht.getUserInfo();
    this.nombre = this.userInfo.id_user
    this.traerLibros()
    this.libroService.getLibros(this.nombre).subscribe({
     next: (libros) => {

        this.libros = libros;
      },
      error:(error) => {
        this.toastrService.error('Error al obtener libros:', 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
     } );
  }


  traerLibros(){
    this.libroService.getLibros(this.nombre).subscribe({
      next: (libros) => {
 
         this.libros = libros;
       },
       error:(error) => {
         this.toastrService.error('Error al obtener libros:', 'Fail', {
           timeOut: 3000,  positionClass: 'toast-top-center',
         });
       }
      } );
  }
  descarga(archivo: string , id_libro:string): void {
    this.libro_des.descarga(archivo,id_libro).subscribe({
     next: (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        // Crear un enlace para descargar el archivo
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = archivo; // El nombre del archivo es el mismo que el proporcionado al método
        downloadLink.click();
      },
      error:(error) => {
        this.toastrService.error('Error al descargar el archivo', 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
     } );
  }


  borrar(libro_id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Si elimina este libro no podra recuperarlo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.libroService.eliminarLibro(libro_id);
        Swal.fire('OK', 'Libro eliminado', 'success');
        this.traerLibros();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'Se conserva el libro', 'error');
      }
    });
  }

}
