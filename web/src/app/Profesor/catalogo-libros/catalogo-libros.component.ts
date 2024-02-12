import { Component, Input, OnInit, inject } from '@angular/core';
import { LibroService } from '../libro.service';
import { AuthService } from '../../roles/auth.service';
import { RouterModule } from '@angular/router';
import { VistalibroService } from '../../usuario/vistalibro/vistalibro.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogo-libros',
  standalone: true,
  imports: [RouterModule ,CommonModule],
  templateUrl: './catalogo-libros.component.html',
  styleUrls: ['./catalogo-libros.component.css']
})
export class CatalogoLibrosComponent implements OnInit {
  @Input() libros: any[] = [];
  userInfo: any;
  nombre='';
  currentPage = 1;
  itemsPerPage = 12;
  totalPages: number;
  private libroService = inject( LibroService )
  private auht =inject(AuthService)
  private libro_des =inject( VistalibroService)
  private toastrService: ToastrService = inject(ToastrService);
libro: any;

  ngOnInit() {
    this.userInfo = this.auht.getUserInfo();
    this.nombre = this.userInfo.id_user
    this.traerLibros()
        
  }
  
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.libros.length / this.itemsPerPage);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPaginatedLibros(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.libros.slice(startIndex, endIndex);
  }

  eror_carga_imagen(libro){
    if(!libro.imagen.includes("http://")){
const baseUrl = environment.URL;
      libro.imagen = baseUrl+'imagen?filename='+libro.imagen
      console.log(libro.imagen)
    }else( libro.imagen = './assets/images/imagennoencontrada.png')
  }

  traerLibros() {
    this.libroService.getLibros(this.nombre).subscribe({
      next: (libros) => {
        this.libros = libros;
        this.calculateTotalPages();
      },
      error: (error) => {
        this.toastrService.error('Error al obtener libros:', 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    });
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
  visiblePages(): number[] {
    const pagesToShow = 5;
    const pages: number[] = [];
  
    if (this.totalPages <= pagesToShow) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      const middle = Math.ceil(pagesToShow / 2);
      let startPage = this.currentPage - middle + 1;
      let endPage = startPage + pagesToShow - 1;
  
      if (startPage <= 0) {
        startPage = 1;
        endPage = pagesToShow;
      } else if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = endPage - pagesToShow + 1;
      }
  
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
  
    return pages;
  }
  
  goToFirstPage(): void {
    this.setPage(1);
  }
  
  goToLastPage(): void {
    this.setPage(this.totalPages);
  }
}
