import { Component, inject } from '@angular/core';
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
  errorAlerta = false;
  Alertabien= false;


  private carreraService = inject(NacionalidadService)
  private router = inject(Router)

  ngOnInit() {
    this.carreraService.traerTodas().subscribe((carreras) => {
      
      this.Carreras = carreras

    });}

  

     
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
      id_nacionalidad = 0
test(id:number){

  this.id_nacionalidad = id
}


      eliminar() {
        try{
          this.carreraService.eliminarCarrera(this.id_nacionalidad)

        }catch(error){
          throw error
        }
        

        
      }
  
    


}
