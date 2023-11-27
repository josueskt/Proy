import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  private baseUrl: string = 'http://localhost:3000/libro';

  constructor(private http: HttpClient) {}

  getLibros(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getLibro(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  crearLibro(libro: any, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('libro', JSON.stringify(libro));
    formData.append('file', file, file.name);

    return this.http.post<{ message: string, newFileName: string }>(`${this.baseUrl}`, formData);
  }


  eliminarLibro(id: number): Observable<any> {
    
    const headers = new HttpHeaders()
    return this.http.delete(`${this.baseUrl}/eliminar/${id}`);
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
