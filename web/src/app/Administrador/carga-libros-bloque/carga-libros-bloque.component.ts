import { Component } from '@angular/core';
import { CargaLibrosBloqueService } from './carga-libros-bloque.service';
import { HomeService } from 'src/app/usuario/home/home.service';


@Component({
  selector: 'app-carga-libros-bloque',
  templateUrl: './carga-libros-bloque.component.html',
  styleUrls: ['./carga-libros-bloque.component.css']
})

export class CargaLibrosBloqueComponent {

    
    constructor(private archivo:CargaLibrosBloqueService, private homeService: HomeService, ){}
  archivoSeleccionado: File | undefined;
  carreras:any
  ngOnInit() {
    
    

    this.homeService.getCarreras().subscribe(
      (carreras) => {
        this.carreras = carreras;
        
      },
      (error) => {
        console.error('Error al obtener las carreras:', error);
      }
    );
   
  }





  handleFileInput(event: any): void {
    this.archivoSeleccionado = event.target.files[0];
  }

  procesarArchivo(): void {
    
    if (this.archivoSeleccionado) {
      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {

        const data = e.target.result;
        this.archivo.processExcel(data);
      };

      reader.readAsBinaryString(this.archivoSeleccionado);

    } else {
      console.error('No se ha seleccionado ningún archivo.');
    }
  }



 


}
