import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EstantesServiceService } from './estantes-service.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-estantes',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './estantes.component.html',
  styleUrl: './estantes.component.css'
})
export class EstantesComponent {

  private estante_S = inject(EstantesServiceService)
  estante!:FormGroup
  lista_estante!:{nombre:string,id_estante:string}[]
  private toastrService: ToastrService = inject(ToastrService);

  private fb = inject(FormBuilder)
  url = window.location.origin + '/';
  
  
  
  
  enlace: string = this.url;
  
  
  

    ngOnInit(): void {
      this.estante =  this.fb.group({nombre:['']})
      
      this.traer_seciones()
    }
    
    traer_seciones(){
      this.estante_S.traer_lista_es().subscribe((e:any)=>{
        this.lista_estante = e
        //console.log(this.lista_estante)
      })
    }
  eliminar_estante(id_estante:string){
    this.estante_S.eliminar(id_estante).subscribe({next:(e:any)=>{
      this.toastrService.success("Creado exitosamente", 'Exito', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
      setTimeout(() => {
        window.location.reload()
      }, 1000);
  
    },error:(e)=>{
      this.toastrService.error(e.message[0], 'Error', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
  
    }})
  }
    crear( ){
      return this.estante_S.crear_estante(this.estante.value).subscribe((r:any)=>{
        this.toastrService.success("Creado exitosamente", 'Exito', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      })
    }
  

}
