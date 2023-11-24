import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {
  searchText: string = '';
  selectedCarrera: string = '';
  resultados: any[] = []; // Variable para almacenar los resultados de la búsqueda

  constructor(private http: HttpClient) {}

  buscarLibros() {
    // Realiza la solicitud HTTP al backend
    const url = `http://localhost:3000/buscador?cadena=${this.searchText}&carrera=${this.selectedCarrera}`;

    this.http.get<any[]>(url)
      .subscribe(resultados => {
        // Maneja los resultados de la búsqueda, por ejemplo, actualiza la variable de resultados
        this.resultados = resultados;
      }, error => {
        console.error(error);
      });
  }
}
