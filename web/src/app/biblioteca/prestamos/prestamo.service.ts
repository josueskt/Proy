import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  base = environment.URL;
  private baseUrl =  `${this.base}prestamos`;
  private baseUrl2 =  `${this.base}usuario`;

  constructor(private http: HttpClient) {}

prestamo(prestamo:{}){
return this.http.post(`${this.baseUrl}`,{prestamo})
}   
verificar_cliente(id:string){
return this.http.get(`${this.baseUrl2}/${id}`)
}
crear_cliente(cliente:{}){


return this.http.post(this.baseUrl2,{cliente})
}

buscador_libros_disponibles(buscador:string){
return this.http.get(`${this.baseUrl}/libros?libro=${buscador}`)

}
}
