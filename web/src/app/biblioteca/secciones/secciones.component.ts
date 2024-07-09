import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SeccionesSericeService } from './secciones-serice.service';
import { secciones } from '../../interfaces/secciones.interface';

@Component({
  selector: 'app-secciones',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './secciones.component.html',
  styleUrl: './secciones.component.css'
})
export class SeccionesComponent {

  private route = inject(ActivatedRoute)
  private secions_s = inject(SeccionesSericeService)
  private fb = inject(FormBuilder)

  seccion!:FormGroup
  id!:string
  secciones:secciones[] = []
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      
    });
    this.seccion =  this.fb.group({nombre:[''],fk_estante:[this.id]})
      this.traer_seciones(this.id)
  }


  url = window.location.origin + '/';




  enlace: string = this.url;
  
  
  
  


  traer_seciones(id: string): void {
    this.secions_s.taer_seciones_estante(id).subscribe((r:any) => {
      this.secciones = r;
      console.log(r)
    });
  }
  crear(){
this.secions_s.crear(this.seccion.value).subscribe({
  next:(r:any)=>{alert(r.message[0])
     window.location.reload()},
  error:(e)=>{alert(e.message[0])}
})
  }
  elimiar(id:string){
    this.secions_s.eliminar(id).subscribe({
      next:(e:any)=>{
        window.location.reload()
        alert(e.message[0])
      },
      error:(e)=>{ alert(e.message[0])}
    })
  }

}
