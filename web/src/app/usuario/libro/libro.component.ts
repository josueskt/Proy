import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import Masonry from 'masonry-layout';

import { DataService } from '../data.service';
import { RouterLink } from '@angular/router';
import { NgClass, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [RouterLink ,UpperCasePipe,FormsModule ,NgClass],
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit, AfterViewInit, OnDestroy {
  resultados: any[] = [];

  @ViewChild('contenedorLibros') contenedorLibros!: ElementRef;

  private masonryInstance!: Masonry; // Inicializado aquí

  private dataService=inject(  DataService)

  ngOnInit() {
    this.dataService.resultados$.subscribe((resultados) => {
      this.resultados = resultados;
     
  
      // Lógica para seleccionar aleatoriamente los índices de elementos grandes
      const numeroElementosGrandes = Math.floor(Math.random() * this.resultados.length); // Puedes ajustar el número según tus necesidades
  
      const indicesElementosGrandes:any = [];
      while (indicesElementosGrandes.length < numeroElementosGrandes) {
        const indice = Math.floor(Math.random() * this.resultados.length);
        if (!indicesElementosGrandes.includes(indice)) {
          indicesElementosGrandes.push(indice);
        }
      }
  
      // Asigna la propiedad esGrande a cada elemento en resultados según los índices seleccionados
      this.resultados.forEach((libro, index) => {
        libro.esGrande = indicesElementosGrandes.includes(index);
      });
    });
  }
  

  ngAfterViewInit() {
    // Inicializar Masonry después de que las tarjetas se hayan renderizado
    this.initMasonry();
  }

  ngOnDestroy() {
    // Destruir la instancia de Masonry cuando el componente se destruye
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
}
