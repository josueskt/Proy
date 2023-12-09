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
  errorAlerta:boolean = false;
  Alertabien:boolean = false;
  


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
        const nombreFormateado = this.formatoNombre(this.carrera.nombre);
        const nombreExistente = this.Carreras.some(c => this.formatoNombre(c.nombre)===nombreFormateado);
        if (nombreExistente) {
          this.errorAlerta=true
          setTimeout(() => {
            this.errorAlerta = false;
          }, 4000);
          
        } else {
          this.carreraService.crearCarrera(this.carrera).subscribe(
            () => {              
              this.Alertabien=true
              setTimeout(() => {
                window.location.reload();
                this.Alertabien = false;
              }, 4000);
            },
            (error) => {
              console.error('Error al crear carrera:', error);
            }
          );
        }
      }

      
      formatoNombre(nombre: string) {
        return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
      }
      
    }

