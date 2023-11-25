import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { NumberValue } from 'd3';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  @ViewChild('chart', { static: true }) private chartContainer!: ElementRef;
  estadisticas: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/estadisticas').subscribe((data) => {
      this.estadisticas = data;
      this.createChart();
    });
  }

  private createChart() {
    const data = this.estadisticas.map((estadistica) => {
      const fecha = new Date(estadistica.fecha);
      const fechaFormateada = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`;
      return { date: fechaFormateada, value: 1 }; // Ajusta esto según tus datos reales
    });

    // Agrupar datos por fecha y contar la cantidad de usuarios que ingresaron
    const groupedData: { [key: string]: number } = data.reduce((accumulator, currentValue) => {
      const date = currentValue.date;
      accumulator[date] = (accumulator[date] || 0) + 1;
      return accumulator;
    }, {} as { [key: string]: number });  // Anotación de tipo para accumulator

    // Convertir datos agrupados a un formato adecuado para el gráfico
    const newData = Object.keys(groupedData).map((date) => ({
      date,
      value: groupedData[date],
    }));

    // Limitar la cantidad de barras a mostrar (puedes ajustar este límite según tus necesidades)
    const maxBarsToShow = 10;
    const slicedData = newData.slice(0, maxBarsToShow);

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 1200 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3
      .select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);

    x.domain(slicedData.map((d) => d.date));
    y.domain([0, d3.max(slicedData, (d) => d.value as NumberValue)!]);

    svg
      .selectAll('rect')
      .data(slicedData)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.date)!)
      .attr('width', x.bandwidth())
      .attr('y', (d) => y(d.value as NumberValue))
      .attr('height', (d) => height - y(d.value as NumberValue))
      .attr('fill', 'steelblue');  // Cambia 'steelblue' a 'blue' o el tono de azul que prefieras

    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    svg.append('g').call(d3.axisLeft(y));
  }
}
