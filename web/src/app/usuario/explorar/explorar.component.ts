import { Component, OnInit } from '@angular/core';
import { ExplorarService } from './explorar.service';  // Asegúrate de que la ruta al servicio sea correcta
import { Observable } from 'rxjs';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.component.html',
  styleUrls: ['./explorar.component.css']
})
export class ExplorarComponent implements OnInit {
  libros: any[] = [];
  carreras: any[] = [];
  selectedCarrera: string | null = null;
  librosFiltrados: any[] = [];

  constructor(
    private explorarService: ExplorarService,
    private homeService: HomeService
    ) {}

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
