import { Component, inject } from '@angular/core';
import * as XLSX from 'xlsx';
import { CrearUsuariosService } from './crear-usuarios.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { LoaderComponent } from "../../componentes/loader/loader.component";
import { CrearUsuarioserviceService } from '../crear-usuario/crear-usuarioservice.service';

@Component({
  selector: 'app-crear-usuarios',
  standalone: true,
  imports: [FormsModule, NgxPaginationModule, RouterModule, LoaderComponent],
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
  private toastrService: ToastrService = inject(ToastrService);
 private usuario = inject(CrearUsuarioserviceService)


  onKeyUp(event: KeyboardEvent): void {
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
      this.toastrService.success('Se ha cargado el archivo', 'OK', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
      this.cargarCarreras();
    } else {
      this.toastrService.error('No se ha seleccionado nigun archivo', 'Fail', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
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
        this.toastrService.success(response.message, 'OK', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.cargarCarreras();
      },
     error: (error) => {
        this.loader = false
        //console.log(error)
        this.cargarCarreras();
      }
     } );
  }

  private formatData(jsonData: any[]): any[] {
    const data = jsonData.slice(1);

    const formattedData = data.map(row => {
      const id_user = row[2];
      const email = row[13];
      const password = String( row[2]);
      const nombre = row[4];
      const fk_rol = this.selectedCarrera;
      const carrera = row[16]

      return {
        id_user,
        email,
        password,
        nombre,
        fk_rol,
        carrera
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


  cambio_estado(id:number,estado:boolean){
 this.crearUsuariosService.cambio_estado(id,estado).subscribe({

  next: (response:{message:string}) => {
    this.loader = false
    this.toastrService.success(response.message, 'OK', {
      timeOut: 3000,  positionClass: 'toast-top-center',
    });
    this.cargarCarreras();
  },
  error:(e)=>{
    throw(e)
  }
 })
  }

  cargarCarreras(): void {
    this.crearUsuariosService.get_user().subscribe((carreras) => {
      this.Carreras = carreras;
      //console.log(carreras)
      this.filtrarCarreras();
    });
  }

  filtrarCarreras(): void {
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
    const maxPagesToShow = 10; 
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
  borrar(id_a: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Si elimina este Usuario no lo podra recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.crearUsuariosService.eliminar(id_a).subscribe(() => {
          Swal.fire('OK', 'Usuario eliminado', 'success');
          this.cargarCarreras();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'Se conserva el Usuario', 'error');
      }
    });
  }


restablecer(id:string){

  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Desea restablecer la contraseña del usuario con cedula '+id,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No',
  }).then((result) => {
    if (result.value) {
      this.usuario.restablecer(id).subscribe((e) => {
        Swal.fire('OK',""+ e.message, 'success');
        this.cargarCarreras();
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelado', 'Se conserva la contraseña', 'error');
    }
  });



}

}
