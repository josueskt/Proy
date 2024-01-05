import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = 'http://localhost:3000/login';

  constructor(private http: HttpClient) { }

  login(cedula: string, password: string): Observable<any> {
    // Realiza la solicitud HTTP para autenticar al usuario
    return this.http.post(this.loginUrl, { cedula, password });
  }

}
