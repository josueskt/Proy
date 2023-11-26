import { Component, OnInit } from '@angular/core';
import { CarreraService } from './carrera.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css']
})
export class CarreraComponent  implements OnInit{ 

  Carreras: any[] = [];
  carrera: any = {};


  constructor(private carreraService: CarreraService,private router: Router ) {}

  ngOnInit() {
    this.carreraService.traerTodas().subscribe((carreras) => {
      console.log('Carreras:', carreras);
      this.Carreras = carreras

    });}

    eliminar(id: number) {
      this.carreraService.eliminarCarrera(id).subscribe(
        (subscribe) => {
          console.log(subscribe);
          // Puedes recargar la lista de carreras después de la eliminación
          window.location.reload();
        },
        (error) => {
          console.error('Error al eliminar carrera:', error);
          // Maneja el error según tus necesidades
        }
      );}

     
      editar(id:Number){
        this.router.navigate(['/carrera',id]);

      }
      crearCarrera() {
        this.carreraService.crearCarrera(this.carrera).subscribe(
          () => {
            console.log('Carrera creada con éxito');
            window.location.reload();
          },
          (error) => {
            console.error('Error al crear carrera:', error);
            // Maneja el error según tus necesidades
          }
        );
      }

}
