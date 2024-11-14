import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InventarioServiceService } from './inventario-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent {

  private archivo = inject(InventarioServiceService);
  buscar_l:string =''
pagina=1
  libros!: { id_libro: string, codigo: string, titulo: string }[]
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
    this.archivo.eliminar_libro(id).subscribe({

      next: (e: any) => {
        alert(e.message[0])
        window.location.reload()
      },
      error: (e) => {
        console.log(e)
        window.location.reload()


      }
    }

    )
  }
  traer_libros(pagina:number,buscad?:string) {
  
    this.archivo.traer_libros(pagina,buscad).subscribe((e: any) => {
      this.libros = e
      console.log(e)
    })
  }



  //procesamiento de archivo 
  archivoSeleccionado: File | undefined;
 

  handleFileInput(event: any): void {

    this.archivoSeleccionado = event.target.files[0];
  }
  procesarArchivo(): void {
    if (this.archivoSeleccionado) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const data = e.target.result;
        this.archivo.processExcel(data).subscribe({
          next: (r: any) => {
            alert(r.message[0])
          }, error: (e) => {
            alert(e.message[0])
          }
        });
        // this.toastrService.success('El archivo se procesó correctamente', 'Success', {
        //   timeOut: 3000,
        //   positionClass: 'toast-top-center',
        // });
      };

      reader.readAsBinaryString(this.archivoSeleccionado);
    } else {
      // this.toastrService.error('No se ha seleccionado un archivo', 'Fail', {
      //   timeOut: 3000,
      //   positionClass: 'toast-top-center',
      // });
    }
  }



}
