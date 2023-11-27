import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
 private apiUrl = 'http://localhost:3000';  // Reemplaza esto con la URL correcta de tu backend
  router: any;
  url :any
  constructor(private http: HttpClient) {}

  // Método para obtener carreras
  getCarreras() {
    return this.http.get<any[]>(`${this.apiUrl}/carrera`);
  }
   
  buscarLibros(cadena: string,carrera:string): Observable<any[]> {
  if(carrera ==='por:Carrera'){
    
     this.url = `${this.apiUrl}/buscador?cadena=${cadena} `;
  }
  else{
    this.url = `${this.apiUrl}/buscador?cadena=${cadena}&carrera=${carrera}`;

  }
   
    return this.http.get<any[]>(this.url);
  }
}
