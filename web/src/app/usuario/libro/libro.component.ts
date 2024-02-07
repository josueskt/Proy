import {Component,ElementRef,OnInit,ViewChild,inject,} from '@angular/core';
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
  currentResults: any[] = []; // Resultados para la página actual
  currentPage = 1; // Página actual
  itemsPerPage = 12; // Cantidad de libros por página
  totalPages = 0;
  @ViewChild('contenedorLibros') contenedorLibros!: ElementRef;
   // Inicializado aquí
  private dataService = inject(DataService);
  libro: any;
  ngOnInit() {
    this.dataService.resultados$.subscribe((resultados) => {
      this.resultados = resultados;
      this.updateCurrentResults(); // Actualiza los resultados actuales
    });
    this.totalPages = Math.ceil(this.resultados.length / this.itemsPerPage);
  }
  eror_carga_imagen(libro){
    if(!libro.imagen.includes("http://")){
const baseUrl = environment.URL;
      libro.imagen = baseUrl+'imagen?filename='+libro.imagen
    }else( libro.imagen = './assets/images/imagennoencontrada.png')
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
}
