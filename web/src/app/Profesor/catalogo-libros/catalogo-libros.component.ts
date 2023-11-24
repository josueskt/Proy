import { Component, Input } from '@angular/core';
import { LibrosService } from '../libro.service';

@Component({
  selector: 'app-catalogo-libros',
  templateUrl: './catalogo-libros.component.html',
  styleUrls: ['./catalogo-libros.component.css']
})
export class CatalogoLibrosComponent {
  @Input() libros: any[] = [];

  constructor(private librosService: LibrosService) { }

  ngOnInit() {
    this.libros = this.librosService.getLibros();
  }
  }
