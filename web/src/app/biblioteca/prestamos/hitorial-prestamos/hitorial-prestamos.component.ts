import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrestamoService } from '../prestamo.service';
import { Historial } from '../../../interfaces/historial.interface';

@Component({
  selector: 'app-hitorial-prestamos',
  standalone: true,
  imports: [],
  templateUrl: './hitorial-prestamos.component.html',
  styleUrl: './hitorial-prestamos.component.css'
})
export class HitorialPrestamosComponent {

  id!:string
  private route = inject(ActivatedRoute)
  private historial_S = inject(PrestamoService)
  historial:Historial[] = []
 
   ngOnInit(): void {
     this.route.params.subscribe(params => {
       this.id = params['id'];
      this.hitorial_T(this.id)
     });
   }

   hitorial_T(id:string){
this.historial_S.historial(id).subscribe((e:any)=>{
 this.historial = e
 console.log(this.historial)
})
   }


}
