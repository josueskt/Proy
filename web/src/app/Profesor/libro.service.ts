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

  crearLibro(libro: any, token: string): Observable<any> {
    const formData = this.createFormData(libro);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/crear`, formData, { headers });
  }

  eliminarLibro(id: number): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/eliminar/${id}`, { headers });
  }

  editarLibro(id: number, libro: any): Observable<any> {
    const formData = this.createFormData(libro);
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.baseUrl}/editar/${id}`, formData, { headers });
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

  private getToken(): string {
    // Implementa tu lógica para obtener el token de autenticación (puede ser desde localStorage, cookies, etc.)
    // Aquí un ejemplo simple, reemplázalo con tu propia implementación
    return localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiMTIzNDUiLCJlbWFpbCI6InByb2ZlQGhvdC5jb20iLCJub21icmUiOiJwcm9mZV91bm8iLCJub21icmVfcm9sIjoiUFJPRkVTT1IiLCJpYXQiOjE3MDA5NjYyMjksImV4cCI6MTcwMDk2OTgyOX0.xeDDd1-vCBlshZAyO3sGz6f7rGPJPi9ZCDZpvWgEEEA';
  }
}
