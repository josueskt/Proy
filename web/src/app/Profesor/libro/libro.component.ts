import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent {
  @Input() libro: any;

  descargarLibro() {
    // Lógica para descargar el libro
    console.log('Descargando libro:', this.libro.titulo);
  }
  
}