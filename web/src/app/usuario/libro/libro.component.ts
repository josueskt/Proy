import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibroService } from './libro.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {
  resultados: any[] = [];
  

  constructor(private route: ActivatedRoute, private libroService: LibroService) {}

  ngOnInit() {

      // Obtén los resultados de la URL
      this.route.queryParams.subscribe(params => {
        const resultadosString = params['resultados'];
  
        // Convierte la cadena JSON de resultados a un array
        if (resultadosString) {
          this.resultados = JSON.parse(resultadosString);
        }
      });
    }
  }
 

