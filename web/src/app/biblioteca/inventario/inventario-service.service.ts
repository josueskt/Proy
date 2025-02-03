import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { AuthService } from '../../roles/auth.service';
@Injectable({
  providedIn: 'root'
})
export class InventarioServiceService {
  base = environment.URL;
  private baseUrl = `${this.base}inventario`;
  private baseUrl2 = `${this.base}libro`;
  constructor(private http: HttpClient, readonly auth: AuthService) { }
  eliminar_libro(id: string) {
    return this.http.delete(`${this.baseUrl2}/${id}`)
  }
  traer_libros(pagina: number, buscad?: string) {
    return this.http.get(`${this.baseUrl}?pagina=${pagina}&buscar=${buscad}`)
  }
 
}