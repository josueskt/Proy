import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Login } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  base = environment.URL;
  private loginUrl  =  `${this.base}login`;

  constructor(private http: HttpClient) { }

  login(cedula: string, password: string): Observable<Login> {
    // Realiza la solicitud HTTP para autenticar al usuario
    return this.http.post<Login>(this.loginUrl, { cedula, password });
  }

}
