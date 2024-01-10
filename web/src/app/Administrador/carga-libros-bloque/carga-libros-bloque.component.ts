import { Component, inject } from '@angular/core';
import { CargaLibrosBloqueService } from './carga-libros-bloque.service';
import { HomeService } from '../../usuario/home/home.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carga-libros-bloque',
  standalone: true,
  imports: [],
  templateUrl: './carga-libros-bloque.component.html',
  styleUrls: ['./carga-libros-bloque.component.css'],
})
export class CargaLibrosBloqueComponent {
  private archivo = inject(CargaLibrosBloqueService);
  private homeService = inject(HomeService);
  private toastrService: ToastrService = inject(ToastrService);

  archivoSeleccionado: File | undefined;
  carreras: any;

  ngOnInit() {
    this.homeService.getCarreras().subscribe(
      (carreras) => {
        this.carreras = carreras;
      },
      (error) => {
        this.toastrService.error(error.error.message, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
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
        this.toastrService.success('El archivo se procesó correctamente', 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      };

      reader.readAsBinaryString(this.archivoSeleccionado);
    } else {
      this.toastrService.error('No se ha seleccionado un archivo', 'Fail', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
    }
  }
}
