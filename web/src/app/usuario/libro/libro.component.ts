import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import Masonry from 'masonry-layout';

import { DataService } from '../data.service';
import { RouterLink } from '@angular/router';
import { NgClass, NgFor, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [RouterLink, UpperCasePipe, FormsModule, NgClass, NgFor],
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css'],
})
export class LibroComponent implements OnInit, AfterViewInit, OnDestroy {
  resultados: any[] = [];
  currentResults: any[] = []; // Resultados para la página actual
  currentPage = 1; // Página actual
  itemsPerPage = 10; // Cantidad de libros por página

  @ViewChild('contenedorLibros') contenedorLibros!: ElementRef;
  private masonryInstance!: Masonry; // Inicializado aquí
  private dataService = inject(DataService);

  ngOnInit() {
    this.dataService.resultados$.subscribe((resultados) => {
      this.resultados = resultados;
      this.updateCurrentResults(); // Actualiza los resultados actuales

      // Lógica para seleccionar aleatoriamente los índices de elementos grandes
      const numeroElementosGrandes = Math.floor(
        Math.random() * this.resultados.length
      );
      const indicesElementosGrandes: any = [];
      while (indicesElementosGrandes.length < numeroElementosGrandes) {
        const indice = Math.floor(Math.random() * this.resultados.length);
        if (!indicesElementosGrandes.includes(indice)) {
          indicesElementosGrandes.push(indice);
        }
      }
      this.resultados.forEach((libro, index) => {
        libro.esGrande = indicesElementosGrandes.includes(index);
      });
    });
  }

  eror_carga_imagen(libro){
    
    libro.imagen = './assets/images/imagennoencontrada.png'
  }

  ngAfterViewInit() {
    this.initMasonry();
  }

  ngOnDestroy() {
    if (this.masonryInstance) {
      this.masonryInstance.destroy?.();
    }
  }

  initMasonry() {
    this.masonryInstance = new Masonry(this.contenedorLibros.nativeElement, {
      itemSelector: '.col-md-4',
      columnWidth: '.col-md-4',
      percentPosition: true,
    });
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
}