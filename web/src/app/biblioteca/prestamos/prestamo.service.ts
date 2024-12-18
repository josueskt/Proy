import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CrearUsuarioserviceService } from '../../Administrador/crear-usuario/crear-usuarioservice.service';
import { Usuario } from '../../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  base = environment.URL;
  private baseUrl =  `${this.base}prestamos`;
  private baseUrl2 =  `${this.base}prestamos/usuario`;

  constructor(private http: HttpClient , private registart_V_S:CrearUsuarioserviceService) {}

prestamo(prestamo:{}){
return this.http.post(`${this.baseUrl}`,{prestamo})
}   
verificar_cliente(id:string){
return this.http.get(`${this.baseUrl2}/${id}`)
}
crear_cliente(cliente:Usuario){
cliente.password = cliente.cedula
//console.log(cliente)
return this.registart_V_S.crearUsuario(cliente)

}

buscador_libros_disponibles(buscador:string){
return this.http.get(`${this.baseUrl}/libros?libro=${buscador}`)

}
historial(id:string){
  return this.http.get(`${this.baseUrl}/${id}`)
}
}
