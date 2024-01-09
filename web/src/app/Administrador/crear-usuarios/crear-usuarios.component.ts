import { Component, inject } from '@angular/core';
import * as XLSX from 'xlsx';
import { CrearUsuariosService } from './crear-usuarios.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-crear-usuarios',
  standalone: true,
  imports: [FormsModule,NgxPaginationModule],
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent {
  archivoSeleccionado: File | undefined;
  filtroCedula = '';
  pageSize = 5;
  currentPage = 1;
  Carreras: any[] = [];
  carrerasFiltradas: any[] = [];
  loader = false
  selectedCarrera =3;
  
  private crearUsuariosService= inject(CrearUsuariosService)


  onKeyUp(event: KeyboardEvent): void {
    // Puedes agregar lógica adicional si es necesario
  }

  handleFileInput(event: any): void {
    this.archivoSeleccionado = event.target.files[0];
  }

  procesarArchivo(): void {
    if (this.archivoSeleccionado) {
      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
        const data = e.target.result;
        this.processExcel(data);
      };

      reader.readAsBinaryString(this.archivoSeleccionado);

    } else {
      console.error('No se ha seleccionado ningún archivo.');
    }
  }

  private processExcel(data: any): void {
    const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
    const sheetName: string = workbook.SheetNames[0];
    const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

    const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const formattedData = this.formatData(jsonData);

    
  this.loader = true
    this.crearUsuariosService.crearCarrera(formattedData).subscribe({
     next: (response) => {
        this.loader = false
        console.log('Datos procesados con éxito:', response);
        this.cargarCarreras();
      },
      error:(error) => {
        console.error('Error al procesar datos:', error);
      }
     } );
  }

  private formatData(jsonData: any[]): any[] {
    const data = jsonData.slice(1);

    const formattedData = data.map(row => {
      const id_user = row[2];
      const email = row[13];
      const password = row[2];
      const nombre = row[4];
      const fk_rol = this.selectedCarrera;

      return {
        id_user,
        email,
        password,
        nombre,
        fk_rol
      };
    });
    const uniqueData = this.removeDuplicates(formattedData, 'id_user');

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

  ngOnInit() {
    this.cargarCarreras();
  }

  cargarCarreras(): void {
    this.crearUsuariosService.get_user().subscribe((carreras) => {
      
      this.Carreras = carreras;
      this.filtrarCarreras();
    });
  }

  filtrarCarreras(): void {
    // Filtrar las carreras según la cédula y ordenar para que el elemento buscado aparezca primero
    this.carrerasFiltradas = this.Carreras.filter(carrera => carrera.id_user.includes(this.filtroCedula));
    this.carrerasFiltradas.sort((a, b) => {
      if (a.id_user === this.filtroCedula) {
        return -1;
      } else if (b.id_user === this.filtroCedula) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  getPageNumbers(): number[] {
    const totalItems = this.carrerasFiltradas.length;
    const totalPages = Math.ceil(totalItems / this.pageSize);
    
    // Limita el número de páginas que se mostrarán en la paginación
    const maxPagesToShow = 10; // Puedes ajustar este número según tus preferencias
    const startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }
  

  setCurrentPage(pageNumber: number): void {
    const totalPages = this.getPageNumbers().length;
  
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      this.currentPage = pageNumber;
    }
  }
  id_a = 0 
  eliminar() {
    return this.crearUsuariosService.eliminar(this.id_a).subscribe(() => {
      // La eliminación ha sido exitosa, ahora recargamos la página
      window.location.reload();
    });
    
    
  }
  test(id:number){
    this.id_a = id
    
  }
}
