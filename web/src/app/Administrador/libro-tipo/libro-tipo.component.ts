import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibroTipoService } from './libro-tipo.service';

@Component({
  selector: 'app-libro-tipo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './libro-tipo.component.html',
  styleUrl: './libro-tipo.component.css'
})
export class LibroTipoComponent {
  private Tipo = inject(LibroTipoService)
nombre = ""
  tipos:any
  ngOnInit() {
    this.Tipo.get_tipo().subscribe((carreras) => {
      
      this.tipos = carreras
      console.log(carreras)

    });}
   

    crear(){
      this.Tipo.crear_tipo(this.nombre).subscribe(()=>{})
      
    }


}
