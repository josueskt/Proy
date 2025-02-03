import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { AuthService } from '../../roles/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CargaLibrosBloqueService {

  base = environment.URL;
  private baseUrl =  `${this.base}carga-l-lote`;


  constructor(private http: HttpClient,private Aunh: AuthService, private router: Router, ) { }
  creador = this.Aunh.getUserInfo();

  processExcel(data: any): void {
    const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
    const sheetName: string = workbook.SheetNames[0];
    const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
  
    // Leer el Excel como una matriz bidimensional
    const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
    if (jsonData.length > 1) {
      // Obtener los encabezados de la primera fila
      const headers: string[] = jsonData[0].map((header: any) => header?.toString().trim() || '');
  
      // Validar que los encabezados no estén vacíos
      if (headers.some(header => header === '')) {
        console.error('El archivo Excel tiene encabezados vacíos o mal formateados.');
        return;
      }
  
      const formattedData = jsonData.slice(1).map(row => {
        const rowObject: any = {};
  
        headers.forEach((header, index) => {
          rowObject[header.toLowerCase()] = row[index] || null; 
        });
  
        return rowObject;
      });
      const uniqueData = this.removeDuplicates(formattedData, 'titulo');
      const datos = { datos: uniqueData, id_user: this.creador };
      this.librosPorBloque(datos).subscribe(
        response => {
          return response
        },
        error => {
         return error
        }
      );
    } else {
      console.error('El archivo Excel no tiene datos suficientes.');
    }
  }
  librosPorBloque(datos: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, datos) // Enviar el objeto 'datos' directamente
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud:', error);
          throw error; // Lanzar el error para que el componente pueda manejarlo
        })
      );
  }
  private removeDuplicates(array: any[], key: string): any[] {
    const seen = new Set();
    return array.filter(obj => {
      const value = obj[key];
      if (seen.has(value)) {
        return false;
      }
      seen.add(value);
      return true;
    });
  }
}

