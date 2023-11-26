import { Component, Input, OnInit } from '@angular/core';
import { LibroService } from '../libro.service';

@Component({
  selector: 'app-catalogo-libros',
  templateUrl: './catalogo-libros.component.html',
  styleUrls: ['./catalogo-libros.component.css']
})
export class CatalogoLibrosComponent implements OnInit {
  @Input() libros: any[] = [];

  constructor(private libroService: LibroService) { }

  ngOnInit() {
    this.libroService.getLibros().subscribe(
      (libros: any[]) => {
        this.libros = libros;
      },
      error => {
        console.error('Error al obtener libros:', error);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }
}
