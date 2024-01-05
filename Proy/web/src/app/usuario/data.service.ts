import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private resultadosSubject = new BehaviorSubject<any[]>([]);
  resultados$ = this.resultadosSubject.asObservable();

  setResultados(resultados: any[]) {
    this.resultadosSubject.next(resultados);
  }
}
