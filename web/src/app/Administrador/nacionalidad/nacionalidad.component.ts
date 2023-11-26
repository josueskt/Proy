import { Component } from '@angular/core';
import { NacionalidadService } from '../nacionalidad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nacionalidad',
  templateUrl: './nacionalidad.component.html',
  styleUrls: ['./nacionalidad.component.css']
})
export class NacionalidadComponent {

  Carreras: any[] = [];
  carrera: any = {};


  constructor(private carreraService: NacionalidadService,private router: Router ) {}

  ngOnInit() {
    this.carreraService.traerTodas().subscribe((carreras) => {
      console.log('Carreras:', carreras);
      this.Carreras = carreras

    });}

  

     
      editar(id:Number){
        this.router.navigate(['/carrera',id]);

      }
      crearCarrera() {
        console.log(this.carrera.nombre)
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
  
    


}
