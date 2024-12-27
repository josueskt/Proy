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
  private loginUrl  =  `${this.base}`;

  constructor(private http: HttpClient) { }

  login(cedula: string, password: string): Observable<Login> {
    // Realiza la solicitud HTTP para autenticar al usuario
    return this.http.post<Login>(this.loginUrl+'login', { cedula, password });
  }

  reset(id_user:string){
    return this.http.get<{message:string}>(this.loginUrl+'mailer/reset/'+id_user);

  }
  restablecer(token:string){
    return this.http.get<{message:string}>(this.loginUrl+'mailer/restablecer/'+token);

  }
  confirmarRestablecer(token:string,datos){
    return this.http.post<{message:string}>(this.loginUrl+'mailer/restablecer/'+token,datos);

  }
}
