import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class LibroService {
  private baseUrl: string = 'http://localhost:3000/libro';

  private baseUr: string = 'http://localhost:3000/milibro';

  constructor(private http: HttpClient , private router:Router) {}

  getLibros(datos:string): Observable<any> {
   
    return this.http.post(`${this.baseUr}`,{nombre:datos});
  }

  getLibro(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  crearLibro(libro: any, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('libro', JSON.stringify(libro));
    formData.append('file', file, file.name);
    this.router.navigate(['/catalogo']);
    return this.http.post<{ message: string, newFileName: string }>(`${this.baseUrl}`, formData);
    
  }


  eliminarLibro(dato: Number){
    const url = `${this.baseUrl}/${dato}`;
    console.log('entra?')
    this.http.delete(url).subscribe(
      (response) => {
        console.log('Libro eliminado con éxito:', response);
        this.router.navigate(['/catalogo']);
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
