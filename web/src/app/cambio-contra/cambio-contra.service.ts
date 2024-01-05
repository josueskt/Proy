import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CambioContraService {

  base = environment.URL;
  private loginUrl =  `${this.base}cambio-contra`;

  constructor(private http: HttpClient) { }

  password( datos:any): Observable<any> {
    // Realiza la solicitud HTTP para autenticar al usuario
    return this.http.post(this.loginUrl , datos);
  }
}
