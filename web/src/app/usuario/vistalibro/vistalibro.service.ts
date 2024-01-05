import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../roles/auth.service';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class VistalibroService {

  private baseUrl = environment.URL;

  constructor(private http: HttpClient , ) {}
  private ahunt = inject( AuthService)

  u = this.ahunt.getUserInfo()
  user = this.u.id_user


  traerTodas(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}libro/${id}`);
  }


  descarga(filename: string , id_libro : string): Observable<Blob> {

    // Configurar opciones para indicar que esperamos un tipo de respuesta binario (Blob)
    const options = {
      responseType: 'blob' as 'json'
    };

    // http://localhost:3000/descarga?id_user=1&id_libro=1&filename=hola.pdf
    return this.http.get(`${this.baseUrl}descarga?id_user=${this.user}&id_libro=${id_libro}&filename=${filename}`, options) as Observable<Blob>;
  }
}
