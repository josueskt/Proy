import { Injectable } from '@angular/core';

export interface Libro {
  id: number;
  img: string;
  titulo: string;
  autor: string;
  descargas: number;
}

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  private libros: Libro[] = [
    { id: 1, img: 'assets/image/image1.png', titulo: 'Libro 1', autor: 'Autor 1', descargas: 0 },
    { id: 2, img: 'assets/image/image1.png', titulo: 'Libro 2', autor: 'Autor 2', descargas: 1 },
    { id: 2, img: 'assets/image/image1.png', titulo: 'Libro 2', autor: 'Autor 2', descargas: 1 },
    { id: 2, img: 'assets/image/image1.png', titulo: 'Libro 2', autor: 'Autor 2', descargas: 1 },
    { id: 2, img: 'assets/image/image1.png', titulo: 'Libro 2', autor: 'Autor 2', descargas: 1 },
    { id: 2, img: 'assets/image/image1.png', titulo: 'Libro 2', autor: 'Autor 2', descargas: 1 },
    { id: 2, img: 'assets/image/image1.png', titulo: 'Libro 2', autor: 'Autor 2', descargas: 1 },
    { id: 2, img: 'assets/image/image1.png', titulo: 'Libro 2', autor: 'Autor 2', descargas: 1 },
    { id: 2, img: 'assets/image/image1.png', titulo: 'Libro 2', autor: 'Autor 2', descargas: 1 },
    //...
  ];

  getLibros() {
    return this.libros;
  }

  getLibro(libroId: number) {
    return this.libros.find(libro => libro.id === libroId);
  }

  agregarLibro(libro: any) {
    this.libros.push(libro);
  }

  eliminarLibro(libroId: number) {
    const index = this.libros.findIndex(libro => libro.id === libroId);
    if (index !== -1) {
      this.libros.splice(index, 1);
    }
  }

  actualizarLibro(libroActualizado: any) {
    const libro = this.libros.find(libro => libro.id === libroActualizado.id);
    if (libro) {
      libro.titulo = libroActualizado.titulo;
      libro.autor = libroActualizado.autor;
    }
  }
}