import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstantesServiceService {

  base = environment.URL;
  private baseUrl =  `${this.base}estantes`;

  constructor(private http: HttpClient) {}

traer_lista_es(){
  return this.http.get(`${this.baseUrl}`);

}
eliminar(estante_id:string){
  return this.http.delete(`${this.baseUrl}/${estante_id}`);

}
crear_estante(estante:{nombre:string}){
 return this.http.post(this.baseUrl,{estante})


}

}
