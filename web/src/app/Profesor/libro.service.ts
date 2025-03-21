import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Libro } from '../interfaces/libro.interface';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
 
  base = environment.URL;
  private baseUrl = `${this.base}libro`;
  private baseUr = `${this.base}milibro`;

  constructor(private http: HttpClient, private router: Router) {}

  getLibros(datos: string , page:number , texto = ''): Observable<{items:any,result:Libro[]}> {
    return this.http.post<{items:any,result:Libro[]}>(`${this.baseUr}?page=${page}&cadena=${texto}&tipo=2`, { nombre: datos },);
  }
  trear_paginacion(datos){
    return this.http.get(`${this.baseUr}?nombre=${datos}`);
    
  }

 

  getLibro(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.baseUrl}/${id}`);
  }

  crearLibro(libro: Libro, file: File,imagen:File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('libro', JSON.stringify(libro));
    if (file) {
      formData.append('file', file, file.name);
    }
    if (imagen) {
      formData.append('imagenfile', imagen, imagen.name);
    }
    
    return this.http.post<{ message: string; newFileName: string }>(
      `${this.baseUrl}`,
      formData
    );
  }
  
  eliminarLibro(dato: number) {
    const url = `${this.baseUrl}/${dato}`;

    this.http.delete(url).subscribe(
      (response) => {
        //console.log('Libro eliminado con éxito:', response);
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
