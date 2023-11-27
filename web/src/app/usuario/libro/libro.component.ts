import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {
  resultados: any[] = [] ;
  

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.resultados$.subscribe((resultados) => {
      this.resultados = resultados;
      console.log('Resultados en otro componente:', this.resultados);
    });
  }

  }
 



