import { Component, OnInit, inject } from '@angular/core';
import { ExplorarService } from './explorar.service';  // Asegúrate de que la ruta al servicio sea correcta

import { HomeService } from '../home/home.service';
import { RouterLink } from '@angular/router';
import { FormsModule, } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-explorar',standalone: true,
  imports: [RouterLink ,FormsModule,],
  templateUrl: './explorar.component.html',
  styleUrls: ['./explorar.component.css']
})
export class ExplorarComponent implements OnInit {
  libros: any[] = [];
  carreras: any[] = [];
  selectedCarrera: string | null = null;
  librosFiltrados: any[] = [];


    private explorarService=inject( ExplorarService)
    private homeService=inject( HomeService)
    private toastrService: ToastrService = inject(ToastrService);

  ngOnInit() {
    this.obtenerLibros();
  }

  private obtenerLibros() {
    this.explorarService.obtenerLibros().subscribe(
      (libros: any[]) => {
        this.libros = libros;

      },
      (error: any) => {
        this.toastrService.error('Error al obtener libros:', 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
    this.homeService.getCarreras().subscribe(
      (carreras: any) => {
        this.carreras = carreras;
      },
      (error: any) => {
        this.toastrService.error('Error al obtener las carreras:', 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }

}
