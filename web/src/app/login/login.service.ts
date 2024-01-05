import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  base = environment.URL;
  private loginUrl  =  `${this.base}login`;

  constructor(private http: HttpClient) { }

  login(cedula: string, password: string): Observable<any> {
    // Realiza la solicitud HTTP para autenticar al usuario
    return this.http.post(this.loginUrl, { cedula, password });
  }

}
