import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrearUsuarioserviceService {

  base = environment.URL;
  private baseUrl =  `${this.base}registro-usuario`;
  location: any;

  constructor(private http: HttpClient) { }
  crearUsuario(datos:any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, {user:datos});
  }
}
