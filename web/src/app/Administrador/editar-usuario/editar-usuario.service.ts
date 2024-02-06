import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditarUsuarioService {

  base = environment.URL;
  private baseUrl =  `${this.base}usuarios_regis`;
  location: any;

  constructor(private http: HttpClient) { }
  get_user_by_Id(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  editarusuario(datos_usuario,){
    return this.http.put(`${this.baseUrl}/${datos_usuario.id_user}`,datos_usuario);


  }
}
