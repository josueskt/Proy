import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrearAutoresService {

  base = environment.URL;
  private baseUrl =  `${this.base}autor`;


  constructor(private http: HttpClient) {}

  traer_autor(): Observable<any> {

    const asr =  this.http.get(`${this.baseUrl}`);

    return  asr
  }

  crearAutor(datos:any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, datos);
  }

  eliminar(id:number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
