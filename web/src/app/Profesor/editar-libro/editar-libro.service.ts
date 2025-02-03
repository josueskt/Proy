import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { editar_libro } from './editar_libto';

@Injectable({
  providedIn: 'root'
})
export class EditarLibroService {
  base = environment.URL;
  private apiUrl = `${this.base}`;
  constructor(private http: HttpClient) { }

  traer_libro(id){
    return this.http.get(`${this.apiUrl}libro/${id}`);

  }
  getCarreras() {
    return this.http.get(`${this.apiUrl}carrera`);
  }

  editarImagen(id: string, file: File , image:File ,libro:editar_libro) {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('file', file);
    formData.append('libro', JSON.stringify(libro));

    return this.http.patch(`${this.apiUrl}libro/${id}`, formData);
  }
  eliminarP(palabra){
    return this.http.delete(`${this.apiUrl}milibro/palabra/${palabra}`)
  }
}
