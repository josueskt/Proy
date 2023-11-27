import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExplorarService {

  private apiUrl = 'http://localhost:3000/libro';
  
 
  
  constructor(private http: HttpClient) {}


  obtenerLibros(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
}
 
obtenerLibroPorId(libroId: string): Observable<any> {
  const url = `${this.apiUrl}/${libroId}`;
  return this.http.get<any>(url);
}

}
