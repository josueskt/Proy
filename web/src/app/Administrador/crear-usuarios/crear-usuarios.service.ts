import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrearUsuariosService {

  base = environment.URL;
  private baseUrl =  `${this.base}usuarios_regis`;
  location: any;

  constructor(private http: HttpClient) { }
  crearCarrera(datos:any[]): Observable<any> {
  
    JSON.stringify(datos)
    return this.http.post(`${this.baseUrl}`, {"users":datos});
  }
  get_user(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  eliminar(id:number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
  

  cambio_estado(id:number,datos:any){

const data = {
  ...datos,
  "cambio":true
}
    return this.http.put(`${this.baseUrl}/${id}` , data);

  }

}
