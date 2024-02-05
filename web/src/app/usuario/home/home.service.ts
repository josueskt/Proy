import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

 private apiUrl = environment.URL;  // Reemplaza esto con la URL correcta de tu backend
  router: any;
  url :any
  constructor(private http: HttpClient) {}

  // Método para obtener carreras
  getCarreras() {
    return this.http.get<any[]>(`${this.apiUrl}carrera`);
  }

  buscarLibros(cadena: string,carrera:string): Observable<any[]> {
    cadena =  cadena.toLowerCase()
  if(carrera ==='Carrera'){

     this.url = `${this.apiUrl}buscador?cadena=${cadena} `;
  }
  else{
    this.url = `${this.apiUrl}buscador?cadena=${cadena}&carrera=${carrera}`;

  }

    return this.http.get<any[]>(this.url);
  }
}
