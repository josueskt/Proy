import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { AuthService } from '../../roles/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CargaLibrosBloqueService {
  

   
    constructor(private http: HttpClient,private Aunh: AuthService, private router: Router, ) { }
  creador = this.Aunh.getUserInfo();
  private baseUrl = 'http://localhost:3000/carga-l-lote';

  processExcel(data: any): void {
    const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
    const sheetName: string = workbook.SheetNames[0];
    const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

    const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const formattedData = this.formatData(jsonData);

     // Objeto con propiedad 'datos'

     const datos = {datos:formattedData,id_user:this.creador}
      this.librosPorBloque(datos).subscribe(
        response => {
          
          console.log('Respuesta del servidor:', response);
          this.router.navigate(['/catalogo'])

          // Puedes manejar la respuesta del servidor según tus necesidades
        },
        error => {
          console.error('Error en la solicitud:', error);
          // Puedes manejar el error según tus necesidades
        }
      );
     
    
  }
  
 

  private formatData(jsonData: any[]): any[] {
    const data = jsonData.slice(1);

    const formattedData = data.map(row => {
      const titulo = row[0];
      const autor = row[1];
      const descripcion = row[5];
      const carrera = row[8];
      const imagen = row[11];
      const archivo = row[10];

      return {
        titulo, autor, descripcion, carrera, imagen, archivo
      };
    });

    const uniqueData = this.removeDuplicates(formattedData, 'titulo');
    

    return uniqueData;
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

