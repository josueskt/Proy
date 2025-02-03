import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InventarioServiceService } from './inventario-service.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from "../../componentes/loader/loader.component";
import { CargaLibrosBloqueService } from '../../Administrador/carga-libros-bloque/carga-libros-bloque.service';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [FormsModule, RouterLink, LoaderComponent],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent {
load = true
  private archivo = inject(InventarioServiceService);
  private archivo_lote = inject(CargaLibrosBloqueService)
  private toast = inject(ToastrService)
  buscar_l:string =''
pagina=1
  libros!: { id_libro: string, codigo: string, titulo: string }[]
full_loader = false;
  ngOnInit(): void {
    this.traer_libros(this.pagina,this.buscar_l)

  }

  buscar(){
    this.traer_libros(1,this.buscar_l)
  }
 
  siguiente = () => {
    this.pagina += 1;
    this.traer_libros(this.pagina,this.buscar_l);
  }
  atras = () => {
    if (this.pagina > 1) {
      this.pagina -= 1;
      this.traer_libros(this.pagina,this.buscar_l);
    }
  }

  eliminar(id: string) {
    this.load = false
    this.archivo.eliminar_libro(id).subscribe({
      next: (e: any) => {
        this.load = true

        this.traer_libros(this.pagina,this.buscar_l)
        this.toast.success('eliminado exitosamente')
      },
      error: (e) => {
        this.load = true

        this.toast.error(e,'No se pudo eliminar')
      }
    }

    )
  }
  traer_libros(pagina:number,buscad?:string) {
    this.full_loader = true
    this.archivo.traer_libros(pagina,buscad).subscribe((e: any) => {
      this.libros = e
      this.full_loader = false
    })
  }



  archivoSeleccionado: File | undefined;
 

  handleFileInput(event: any): void {

    this.archivoSeleccionado = event.target.files[0];
  }
  procesarArchivo(): void {
    this.full_loader = true
    if (this.archivoSeleccionado) {
      const reader: FileReader = new FileReader();
      reader.onload = async (e: any) => {
        const data = e.target.result;
        await this.archivo_lote.processExcel(data)
        this.traer_libros(this.pagina,this.buscar_l)
        this.full_loader = false
        

      };

      reader.readAsBinaryString(this.archivoSeleccionado);
    } else {
    
    }
  }



}
