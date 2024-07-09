import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeccioneSericeService {

  base = environment.URL;
  private baseUrl =  `${this.base}seciones`;

  constructor(private http: HttpClient) {}

  taer_seciones_estante(id:string){

    return this.http.get(`${this.baseUrl}?estante=${id}`)
  }
  crear(seccion:{}){
    console.log(seccion)
return this.http.post(`${this.baseUrl}`,{seccion}  )
  }

  editar(id:string,agregados:string[],eliminados:string[],nombre:{nombre:string}){

    const seccion = {
      nombre:nombre.nombre,
  id_seccion:id,
 
  agregados:agregados,
  eliminados:eliminados
    }

    return this.http.put(`${this.baseUrl}`,{seccion})

  }
  eliminar(id:string){
    return this.http.delete(`${this.baseUrl}/${id}`)
  }

  // edicion de seccion
  
  traer_libros_no_a(buscador:string){
    return this.http.get(`${this.baseUrl}/libros?buscar=${buscador}`)
  }
  traer_libros_asignados(id:string){
    return this.http.get(`${this.baseUrl}/${id}`)

  }

}
