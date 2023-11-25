import { Injectable } from '@angular/core';

export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  descripcion: string;
  fechaPublicacion: Date;
  paginas: number;
  materia: string;
  carreras: string;
  imagenUrl: string
}

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  private libros: Libro[] = [
    { id: 1, titulo: 'Libro 1', autor: 'Autor 1', descripcion: 'nuevo', 
    fechaPublicacion: new Date(), paginas: 100, materia: 'matematicas', carreras: 'ingenieria', 
    imagenUrl: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/libro-la-mente-o-cerebro-creativo-design-template-a19552c14c672351ba9ed341c37cadfd_screen.jpg?ts=1637004273', 
   },
    //...
  ];

  getLibros() {
    return this.libros;
  }

  getLibro(libroId: number) {
    return this.libros.find(libro => libro.id === libroId);
  }

  agregarLibro(libro: Libro) {
    this.libros.push(libro);
  }

  eliminarLibro(libroId: number) {
    const index = this.libros.findIndex(libro => libro.id === libroId);
    if (index !== -1) {
      this.libros.splice(index, 1);
    }
  }

  actualizarLibro(libroActualizado: Libro) {
    const libro = this.libros.find(libro => libro.id === libroActualizado.id);
    if (libro) {
      libro.titulo = libroActualizado.titulo;
      libro.autor = libroActualizado.autor;
    }
  }
}