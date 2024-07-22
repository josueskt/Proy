import { Component, inject } from '@angular/core';
import { ReportelibroService } from './reportelibro.service';
import { Libro } from '../../interfaces/libro.interface';
import { HomeService } from '../../usuario/home/home.service';
import { FormsModule } from '@angular/forms';
import { LibroTipoService } from '../libro-tipo/libro-tipo.service';

@Component({
  selector: 'app-reporte-libros',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reporte-libros.component.html',
  styleUrl: './reporte-libros.component.css'
})
export class ReporteLibrosComponent {

  reporte:Libro[] = []
  carrera
  carreras
  tipo
  tipos
  private reporte_S = inject(ReportelibroService)
  private home_s = inject(HomeService)
  private tipo_S = inject(LibroTipoService)
  ngOnInit(): void {
    
    this.tipo_S.get_tipo().subscribe((e)=>{
      this.tipos = e
    })

    this.home_s.getCarreras().subscribe((e)=>{
      this.carreras = e
    })
  }
  async generar(){
   await this.reporte_S.reporte(this.carrera,this.tipo).subscribe((e:Libro[])=>{
      this.reporte = e
      
      this.reporte_S.generateExcel(this.reporte)
    })

  }

}
