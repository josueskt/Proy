import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarreraService {
  private baseUrl = 'http://localhost:3000/carrera'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  traerTodas(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  traerPorId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  crearCarrera(datos: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, datos);
  }

  eliminarCarrera(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  editarCarrera(id: number, nuevosDatos: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, nuevosDatos);
  }
}
