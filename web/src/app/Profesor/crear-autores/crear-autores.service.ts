import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrearAutoresService {

  private baseUrl = 'http://localhost:3000/autor'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  traer_autor(): Observable<any> {
    
    const asr =  this.http.get(`${this.baseUrl}`);
    
    return  asr
  }

  crearAutor(datos:any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, datos);
  }
}
