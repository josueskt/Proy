import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IngresoService } from './ingreso.service';

@Component({
  selector: 'app-ingreso',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ingreso.component.html',
  styleUrl: './ingreso.component.css'
})
export class IngresoComponent  implements OnInit{
  private ingreso_s = inject(IngresoService)
  jornadas
  paralelos
  niveles
ngOnInit(): void {
  
  
}

jornada
paralelo
nivel

registrar(){
  alert(this.jornada+this.paralelo+this.nivel)
}
}
