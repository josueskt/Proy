import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Login } from '../interfaces/login.interface';
import { Cambio_contra } from '../interfaces/cambio_contra.interface';

@Injectable({
  providedIn: 'root'
})
export class CambioContraService {

  base = environment.URL;
  private loginUrl =  `${this.base}cambio-contra`;

  constructor(private http: HttpClient) { }

  password( datos:Cambio_contra): Observable<Login> {
    return this.http.post<Login>(this.loginUrl , datos);
  }
}
