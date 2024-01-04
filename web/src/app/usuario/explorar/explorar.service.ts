import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExplorarService {

  base = environment.URL;
  private apiUrl =  `${this.base}libro`;

  constructor(private http: HttpClient) {}


  obtenerLibros(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
}

obtenerLibroPorId(libroId: string): Observable<any> {
  const url = `${this.apiUrl}/${libroId}`;
  return this.http.get<any>(url);
}

}
