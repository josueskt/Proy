import { Component, OnInit, inject } from '@angular/core';
import { CarreraService } from './carrera.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrera',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css'],
})
export class CarreraComponent implements OnInit {
  Carreras: any[] = [];
  carrera: any = {};
  errorAlerta = false;
  Alertabien = false;
  private router = inject(Router);
  private carreraService = inject(CarreraService);
  private toastrService: ToastrService = inject(ToastrService);

  ngOnInit() {
    this.traerCarrera();
  }


  traerCarrera(){
    this.carreraService.traerTodas().subscribe((carreras) => {
      this.Carreras = carreras;
    });
  }

  borrar(id_carrera: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Si elimina esta carrera se eliminara con los libros que contenga',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.carreraService.eliminarCarrera(id_carrera);
        Swal.fire('OK', 'carrera eliminada', 'success');
        this.traerCarrera();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'Se conserva la carrera', 'error');
      }
    });
  }

  editar(id: number) {
    this.router.navigate(['/admin/carrera', id]);
  }

  crearCarrera() {
    const nombreFormateado = this.formatoNombre(this.carrera.nombre);
    const nombreExistente = this.Carreras.some(
      (c) => this.formatoNombre(c.nombre) === nombreFormateado
    );
    if (nombreExistente) {
      this.errorAlerta = true;
      this.toastrService.error('ese nombre ya existe' , 'Fail', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
      setTimeout(() => {
        this.errorAlerta = false;
      }, 2000);
    } else {
      this.carreraService.crearCarrera(this.carrera).subscribe({
       next: (data) => {
          this.toastrService.success('Carrera creada exitosamente', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.Alertabien = true;
          setTimeout(() => {
            window.location.reload();
            this.Alertabien = false;
          },600);
        },
       error: (error) => {
          this.toastrService.error(`Error al crear carrera`, 'Fail', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }
    });
    }
  }

  formatoNombre(nombre: string) {
    return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
  }
}
