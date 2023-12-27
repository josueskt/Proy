import { HttpClient } from '@angular/common/http';
import {  Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NacionalidadService {

  private baseUrl = 'http://localhost:3000/nacionalidad'; // Reemplaza con la URL de tu backend

  private http =  inject(HttpClient);


  traerTodas(): Observable<any> {
    
    const asr =  this.http.get(`${this.baseUrl}`);
    
    return  asr
  }

  // traerPorId(id: Number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/${id}`);
  // }

  crearCarrera(datos:string): Observable<any> {
    return this.http.post(`${this.baseUrl}`, datos);
  }

   eliminarCarrera(id: number){
   
     return this.http.delete(`${this.baseUrl}/${id}`).subscribe(()=>{
      window.location.reload();
     },(error)=>{
      return error
     });
   }

  // editarCarrera(id: number, nuevosDatos: any): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/${id}`, nuevosDatos);
  //}
}
