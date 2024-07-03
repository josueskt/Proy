import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Libro } from '../interfaces/libro.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private resultadosSubject = new BehaviorSubject<Libro[]>([]);
  resultados$ = this.resultadosSubject.asObservable();

  setResultados(resultados: Libro[]) {
    this.resultadosSubject.next(resultados);
  }
}
