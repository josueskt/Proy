import { Component,  OnInit, inject } from '@angular/core';
import { InformeingresoService } from './informeingreso.service';
import { InformeRegistro } from '../../../interfaces/informe_registro.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-informeingreso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './informeingreso.component.html',
  styleUrl: './informeingreso.component.css'
})
export class InformeingresoComponent implements OnInit {
private informe_S = inject(InformeingresoService)
informe:InformeRegistro[]
  ngOnInit(): void {

this.informe_S.treaer_registro().subscribe((e:InformeRegistro[])=>{ this.informe = e
  console.log(e)
})    
  }

  generar(){
    this.informe_S.generateExcel(this.informe)
  }
  generar_pdf(){
    this.informe_S.generatePdf('contentToConvert')
  }
}
