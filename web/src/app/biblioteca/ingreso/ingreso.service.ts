import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PrestamoService } from '../prestamos/prestamo.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  base = environment.URL;
  private baseUrl =  `${this.base}ingreso`;
  private baseUrl2 =  `${this.base}salida`;

  constructor(private http:HttpClient , private prestamo_S:PrestamoService) { }

  traer_paralelo(){
 return this.http.get(`${this.baseUrl}/paralelo`)
  }
  traer_nivel(){
    return this.http.get(`${this.baseUrl}/nivel`)

  }
  traer_actividad(){
    return this.http.get(`${this.baseUrl}/actividad`)

  }
  traer_jornada(){
    return this.http.get(`${this.baseUrl}/jornada`)

  }
  registrar_ingreso(ingreso){
    return this.http.post(`${this.baseUrl}`,ingreso)

  }
  verificar_cliente(id:string){
    return this.prestamo_S.verificar_cliente(id)
    }

    por_salir(){
    return this.http.get(`${this.baseUrl2}`)

    }
    registrar_salida(id:string){
      return this.http.post(`${this.baseUrl2}/${id}`,{})
  
      }

}
