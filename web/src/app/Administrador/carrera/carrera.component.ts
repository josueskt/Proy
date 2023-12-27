import { Component, OnInit, inject } from '@angular/core';
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
  errorAlerta = false;
  Alertabien = false;
  


  
  private router = inject(Router) 
  private carreraService = inject(CarreraService)

  ngOnInit() {
    this.carreraService.traerTodas().subscribe((carreras) => {
      
      this.Carreras = carreras

    });}
    id_carrera = 0
    test(id:number){
      this.id_carrera = id

    }

    eliminar() {
      try{
        this.carreraService.eliminarCarrera(this.id_carrera)
        //window.location.reload();
      }catch(error){
        console.log(error)

      }

        

    }

     
      editar(id:number){
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

