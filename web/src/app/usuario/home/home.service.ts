import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Carrera } from '../../interfaces/Carrera.interface';
import { Libro } from '../../interfaces/libro.interface';
import { Index } from '../../interfaces/index.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

 private apiUrl = environment.URL;  // Reemplaza esto con la URL correcta de tu backend
  
  url :string
  constructor(private http: HttpClient) {}

  // Método para obtener carreras
  getCarreras() {
    return this.http.get<Carrera[]>(`${this.apiUrl}carrera`);
  }

  index(cadena: string):Observable<Index[]>{
    this.url = `${this.apiUrl}buscador/index?cadena=${cadena}`;
    return this.http.get<Index[]>(this.url);

  }
  buscarLibros(cadena: string,carrera:string , pagina:number,tipo = '2',estante='',seccion=''): Observable<{"result":Libro[] ,"items":any}> {
    cadena =  cadena.toLowerCase()
  

  this.url = `${this.apiUrl}buscador?cadena=${cadena}&carrera=${carrera}&page=${pagina}&tipo=${tipo}&estante=${estante}&seccion=${seccion}`;

    return this.http.get<{"result":Libro[] ,"items":any}>(this.url);
  }
}
