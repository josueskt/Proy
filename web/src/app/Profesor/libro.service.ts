import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  base = environment.URL;
  private baseUrl = `${this.base}libro`;
  private baseUr = `${this.base}milibro`;

  constructor(private http: HttpClient, private router: Router) {}

  getLibros(datos: string): Observable<any> {
    return this.http.post(`${this.baseUr}`, { nombre: datos });
  }

  getLibro(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  crearLibro(libro: any, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('libro', JSON.stringify(libro));
    if (file) {
      formData.append('file', file, file.name);
    }
    this.router.navigate(['/profe']);
    return this.http.post<{ message: string; newFileName: string }>(
      `${this.baseUrl}`,
      formData
    );
  }

  eliminarLibro(dato: number) {
    const url = `${this.baseUrl}/${dato}`;

    this.http.delete(url).subscribe(
      (response) => {
        console.log('Libro eliminado con éxito:', response);
        this.router.navigate(['/profe']);
        // Puedes agregar más lógica aquí si es necesario
      },
      (error) => {
        console.error('Error al eliminar el libro:', error);
        // Puedes manejar el error de alguna manera aquí
      }
    );
  }

  editarLibro(id: number, libro: any): Observable<any> {
    const formData = this.createFormData(libro);

    return this.http.put(`${this.baseUrl}/editar/${id}`, formData);
  }

  private createFormData(libro: any): FormData {
    const formData = new FormData();
    formData.append('titulo', libro.titulo);
    formData.append('imagen', libro.imagen);
    formData.append('descripcion', libro.descripcion);
    formData.append('num_paginas', libro.num_paginas);
    formData.append('fk_creador', libro.fk_creador);
    formData.append('fk_autor', libro.fk_autor);
    formData.append('fk_carrera', libro.fk_carrera);
    formData.append('archivo', libro.archivo);
    return formData;
  }
}
