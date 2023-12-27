import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NacionalidadService {

  private baseUrl = 'http://localhost:3000/nacionalidad'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  traerTodas(): Observable<any> {
    console.log("entro")
    const asr =  this.http.get(`${this.baseUrl}`);
    
    return  asr
  }

  // traerPorId(id: Number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/${id}`);
  // }

  crearCarrera(datos:string): Observable<any> {
    return this.http.post(`${this.baseUrl}`, datos);
  }

   eliminarCarrera(id: number): Observable<any> {
   
     return this.http.delete(`${this.baseUrl}/${id}`);
   }

  // editarCarrera(id: number, nuevosDatos: any): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/${id}`, nuevosDatos);
  //}
}
