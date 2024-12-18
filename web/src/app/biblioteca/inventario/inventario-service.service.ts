import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class InventarioServiceService {

  base = environment.URL;
  private baseUrl =  `${this.base}inventario`;
  private baseUrl2 =  `${this.base}libro`;
  constructor(private http:HttpClient) { }

eliminar_libro(id:string){
  return this.http.delete(`${this.baseUrl2}/${id}`)
}
  traer_libros(pagina:number,buscad?:string){
    return this.http.get(`${this.baseUrl}?pagina=${pagina}&buscar=${buscad}`)
  }

  processExcel(data: any){
    const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
    const sheetName: string = workbook.SheetNames[0];
    const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

    const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const formattedData = this.formatData(jsonData);

    //console.log(formattedData)

     // Objeto con propiedad 'datos'
return this.http.post(this.baseUrl,{libros:formattedData})
     
     
  }
  private formatData(jsonData: any[]): any[] {
    const data = jsonData.slice(1);

    const formattedData = data.map(row => {


      const titulo = row[0];
      const autor = row[1]
      const year_of_publ = row[2]
      const editorial =row[3]
      const isbn =row[4]
      const codigo = row[5]
      const categoria = row[6]
      const cantidad = row[7]
      const tipo = row[8]
      const tomo =row[9]

    



      return {
        titulo,autor,year_of_publ,editorial,isbn,codigo,categoria,cantidad,tipo,tomo
      };
    });

    const uniqueData = this.removeDuplicates(formattedData, 'titulo');
    return uniqueData;
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
