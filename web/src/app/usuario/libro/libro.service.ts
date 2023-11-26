import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private apiUrl = 'http://localhost:3000/libros';

  constructor(private http: HttpClient) {}

  buscarLibros(cadena: string): Observable<any[]> {
    const url = `${this.apiUrl}/buscador?cadena=${cadena}`;
    return this.http.get<any[]>(url);
  }

  getLibrosRelacionados(cadena: string): Observable<any[]> {
    const params = { cadena: cadena };
    return this.http.get<any[]>(`${this.apiUrl}/libros-relacionados`, { params: params });
  }



}
