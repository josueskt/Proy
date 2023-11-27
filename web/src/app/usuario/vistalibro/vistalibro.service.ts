import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VistalibroService {

  private baseUrl = 'http://localhost:3000'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  traerTodas(id:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/libro/${id}`);
  }
  descarga(filename:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/descarga?filename=${filename}`);
  }
}
//this.url = `${this.apiUrl}/descarga?cadena=${cadena}&carrera=${carrera}`;