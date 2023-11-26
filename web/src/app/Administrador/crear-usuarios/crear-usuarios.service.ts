import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrearUsuariosService {
  private baseUrl = 'http://localhost:3000/usuarios_regis';
  constructor(private http: HttpClient) { }
  crearCarrera(datos:any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}`, datos);
  }
  get_user(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

}
