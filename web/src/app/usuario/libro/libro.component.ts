import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { DataService } from '../data.service';
import { RouterLink } from '@angular/router';
import { NgClass, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [RouterLink, UpperCasePipe, FormsModule, NgClass],
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css'],
})
export class LibroComponent implements OnInit {
  resultados: any[] = [];
  currentResults: any[] = [];
  currentPage = 1;
  itemsPerPage = 12;
  totalPages = 0;

  @ViewChild('contenedorLibros') contenedorLibros!: ElementRef;
  private dataService = inject(DataService);
  libro: any;

  ngOnInit() {
    this.dataService.resultados$.subscribe((resultados) => {
      this.resultados = resultados;
      this.updateCurrentResults();
    });
    this.totalPages = Math.ceil(this.resultados.length / this.itemsPerPage);
  }

  eror_carga_imagen(libro) {
    if (!libro.imagen.includes("http://")) {
      const baseUrl = environment.URL;
      libro.imagen = baseUrl + 'imagen?filename=' + libro.imagen;
    } else {
      libro.imagen = './assets/images/imagennoencontrada.png';
    }
  }

  sanitizeUrl(arg0: string): any {
    throw new Error('Method not implemented.');
  }

  updateCurrentResults() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.currentResults = this.resultados.slice(startIndex, endIndex);
  }

  nextPage() {
    if ((this.currentPage * this.itemsPerPage) < this.resultados.length) {
      this.currentPage++;
      this.updateCurrentResults();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateCurrentResults();
    }
  }

  getPages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateCurrentResults();
      // Puedes agregar aquí cualquier otra lógica que necesites al cambiar de página
    }
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
    this.goToPage(1);
  }
  
  goToLastPage(): void {
    this.goToPage(this.totalPages);
  }
}
