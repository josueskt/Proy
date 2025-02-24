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
 //console.log(this.historial)
})
   }

   formatDate(fecha: string | null): string {
    if (!fecha) return 'Sin fecha';
  
    const date = new Date(fecha);
    if (isNaN(date.getTime())) return 'Fecha inválida';
  
    const opciones: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Cambia a `true` si quieres AM/PM
    };
  
    return date.toLocaleString('es-ES', opciones);
  }
  


}
