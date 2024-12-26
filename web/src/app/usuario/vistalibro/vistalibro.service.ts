import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../roles/auth.service';
import { environment } from '../../../../environments/environment';
import { Libro } from '../../interfaces/libro.interface';
import { Etiqueta } from '../../interfaces/Etiqueta.interface';


@Injectable({
  providedIn: 'root'
})
export class VistalibroService {

  private baseUrl = environment.URL;

  constructor(private http: HttpClient , ) {}
  private ahunt = inject( AuthService)

 
  user =  this.ahunt.getUserInfo() || null
  


  traerTodas(id: string): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.baseUrl}libro/${id}`);
  }

  treer_etiqueta(id:string):Observable<Etiqueta[]>{

    return this.http.get<Etiqueta[]>(`${this.baseUrl}etiquetas/${id}`);

  }

  descarga(filename: string , id_libro : string): Observable<Blob> {

    // Configurar opciones para indicar que esperamos un tipo de respuesta binario (Blob)
    const options = {
      responseType: 'blob' as 'json'
    };

    // http://localhost:3000/descarga?id_user=1&id_libro=1&filename=hola.pdf
    return this.http.get(`${this.baseUrl}descarga?id_user=${this.user.id_user}&id_libro=${id_libro}&filename=${filename}`, options) as Observable<Blob>;
  }


}
