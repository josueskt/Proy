import { Component } from '@angular/core';
import { CarreraService } from '../carrera.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {
  carrera: any = {};
  constructor(private carreraService: CarreraService ,private router: Router) {}

  crearCarrera() {
    this.carreraService.crearCarrera(this.carrera).subscribe(
      () => {
        console.log('Carrera creada con éxito');
        // Puedes recargar la lista de carreras después de la creación
        this.router.navigate(['/carrera']);
      },
      (error) => {
        console.error('Error al crear carrera:', error);
        // Maneja el error según tus necesidades
      }
    );
  }

}
