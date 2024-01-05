import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibroTipoService {
  base = environment.URL;
  private baseUrl =  `${this.base}libro-tipo`;

  constructor(private http: HttpClient , private router:Router) {}
  

  getLibro(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  
}
