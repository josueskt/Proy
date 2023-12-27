import { Component, Input, OnInit, inject } from '@angular/core';
import { LibroService } from '../libro.service';
import { AuthService } from 'src/app/roles/auth.service';
import { VistalibroService } from 'src/app/usuario/vistalibro/vistalibro.service';


@Component({
  selector: 'app-catalogo-libros',
  templateUrl: './catalogo-libros.component.html',
  styleUrls: ['./catalogo-libros.component.css']
})
export class CatalogoLibrosComponent implements OnInit {
  @Input() libros: any[] = [];
  userInfo: any;
  nombre='asdasd';

  private libroService = inject( LibroService )
  private auht =inject(AuthService)
  private libro_des =inject( VistalibroService)

  ngOnInit() {
    
    this.userInfo = this.auht.getUserInfo();
    this.nombre = this.userInfo.id_user

    this.libroService.getLibros(this.nombre).subscribe(
      (libros) => {
        
        this.libros = libros;
       
      },
      error => {
        console.error('Error al obtener libros:', error);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }
  descarga(archivo: string , id_libro:string): void {
    this.libro_des.descarga(archivo,id_libro).subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });

        // Crear un enlace para descargar el archivo
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = archivo; // El nombre del archivo es el mismo que el proporcionado al método
        downloadLink.click();
      },
      error => {
        console.error('Error al descargar el archivo', error);
      }
    );
  }
}
