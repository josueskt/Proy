import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EstantesServiceService } from './estantes-service.service';

@Component({
  selector: 'app-estantes',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './estantes.component.html',
  styleUrl: './estantes.component.css'
})
export class EstantesComponent {

  private estante_S = inject(EstantesServiceService)
  estante!:FormGroup
  lista_estante!:{nombre:string,id_estante:string}[]
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
        console.log(this.lista_estante)
      })
    }
  eliminar_estante(id_estante:string){
    this.estante_S.eliminar(id_estante).subscribe({next:(e:any)=>{
      alert(e.message[0])
      window.location.reload()
  
    },error:(e)=>{
      alert(e.message[0])
  
    }})
  }
    crear( ){
      return this.estante_S.crear_estante(this.estante.value).subscribe((r:any)=>{
        window.location.reload()
  
      alert(r.message[0])
      })
    }
  

}
