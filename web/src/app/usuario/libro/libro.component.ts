import {
  
  Component,
  ElementRef,
  
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
export class LibroComponent implements OnInit {
 
  resultados: any[] = [];
  currentResults: any[] = []; // Resultados para la página actual
  currentPage = 1; // Página actual
  itemsPerPage = 10; // Cantidad de libros por página

  @ViewChild('contenedorLibros') contenedorLibros!: ElementRef;
   // Inicializado aquí
  private dataService = inject(DataService);

  ngOnInit() {
    this.dataService.resultados$.subscribe((resultados) => {
      this.resultados = resultados;
      this.updateCurrentResults(); // Actualiza los resultados actuales
     
    });
  }

  eror_carga_imagen(libro){
    console.log(libro.imagen)
    libro.imagen = './assets/images/imagennoencontrada.png' 
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