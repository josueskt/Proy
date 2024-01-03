import { Component, OnInit, ElementRef, ViewChild, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { NumberValue } from 'd3';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  @ViewChild('chart', { static: true }) private chartContainer!: ElementRef;
  estadisticas: any[] = [];
  private http = inject(HttpClient)

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

    // Agrupar datos por fecha y sumar la cantidad de usuarios que ingresaron
    const groupedData: { [key: string]: number } = data.reduce((accumulator, currentValue) => {
      const date = currentValue.date;
      accumulator[date] = (accumulator[date] || 0) + currentValue.value; // Suma los valores
      return accumulator;
    }, {} as { [key: string]: number });

    // Convertir datos agrupados a un formato adecuado para el gráfico
    const newData = Object.keys(groupedData).map((date) => ({
      date,
      value: groupedData[date],
    }));

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

    // Escala para el eje X (bandas)
    const x = d3.scaleBand().range([0, width]).padding(0.1);
    x.domain(newData.map((d) => d.date));

    // Escala para el eje Y (lineal)
    const y = d3.scaleLinear().range([height, 0]);
    y.domain([0, d3.max(newData, (d) => d.value as NumberValue)!]);

    // Agrega el gráfico de barras
    const barsGroup = svg.append('g');

    barsGroup.selectAll('.bar')
      .data(newData)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.date)!)
      .attr('width', x.bandwidth())
      .attr('y', (d) => y(d.value)!)
      .attr('height', (d) => height - y(d.value)!)
      .attr('fill', '#8E44AD');

    // Agrega el gráfico de línea encima de las barras
    const lineGroup = svg.append('g');

    // Agrega línea para representar los datos
    const area = d3.area<{ date: string; value: number }>()
    .x((d) => x(d.date)! + x.bandwidth() / 2)
    .y0(height)
    .y1((d) => y(d.value)!)
    .curve(d3.curveMonotoneX);

  // Añade la región coloreada debajo de la línea
  svg.append('path')
    .datum(newData)
    .attr('class', 'area')
    .attr('d', area)
    .attr('fill', 'rgba(110, 104, 136, 0.3)'); // Color verde con opacidad

  svg.append('path')
    .datum(newData)
    .attr('class', 'line')
    .attr('d', area)
    .attr('fill', 'none')
    .attr('stroke', 'rgb(100, 204, 136)');
    // Agrega transición a los ejes
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));
  }
}
