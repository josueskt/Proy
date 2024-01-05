import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CambioContraService {

  private loginUrl = 'http://localhost:3000/cambio-contra';

  constructor(private http: HttpClient) { }

  password( datos:any): Observable<any> {
    // Realiza la solicitud HTTP para autenticar al usuario
    return this.http.post(this.loginUrl , datos);
  }
}
