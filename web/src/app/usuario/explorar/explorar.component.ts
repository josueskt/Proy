import { Component, OnInit, inject } from '@angular/core';
import { ExplorarService } from './explorar.service';  // Asegúrate de que la ruta al servicio sea correcta
import { Observable } from 'rxjs';
import { HomeService } from '../home/home.service';
import { RouterLink } from '@angular/router';
import { FormGroup, FormsModule, NgModel } from '@angular/forms';

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
    private homeService=inject( HomeService
    )

  ngOnInit() {
    this.obtenerLibros();
  }

  private obtenerLibros() {
    this.explorarService.obtenerLibros().subscribe(
      (libros: any[]) => {
        this.libros = libros;

      },
      (error: any) => {
        console.error('Error al obtener libros:', error);
      }
    );
    this.homeService.getCarreras().subscribe(
      (carreras: any) => {
        this.carreras = carreras;
      },
      (error: any) => {
        console.error('Error al obtener las carreras:', error);
      }
    );
  }
  
}
