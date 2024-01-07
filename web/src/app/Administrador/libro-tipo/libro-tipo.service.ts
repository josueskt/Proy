import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibroTipoService {

  base = environment.URL;
  private baseUrl =  `${this.base}libro-tipo`;
  location: any;
  constructor(private http: HttpClient) { }
  crear_tipo(datos:string): Observable<any> {
    return this.http.post(`${this.baseUrl}`, {"datos":datos});
  }
  get_tipo(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  eliminar_tipo(id:number){

    return this.http.delete(`${this.baseUrl}/${id}`);

  }


}
