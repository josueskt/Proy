import { Component, OnInit, ElementRef, ViewChild, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { NumberValue } from 'd3';
import { environment } from '../../../../environments/environment';


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
  base = environment.URL;
  private baseUrl = `${this.base}estadisticas`;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>(this.baseUrl).subscribe((data) => {
      this.estadisticas = data.reverse();

      this.createChart();
    });
  }

  private createChart() {
    const data = this.estadisticas.map((estadistica) => {
      const fecha = new Date(estadistica.fecha);
      const fechaFormateada = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`;
      return { date: fechaFormateada, value: 1 }; // Ajusta esto según tus datos reales
    });

    const groupedData: { [key: string]: number } = data.reduce((accumulator, currentValue) => {
      const date = currentValue.date;
      accumulator[date] = (accumulator[date] || 0) + currentValue.value;
      return accumulator;
    }, {} as { [key: string]: number });

    const newData = Object.keys(groupedData).map((date) => ({
      date,
      value: groupedData[date],
    }));

    const maxBarsToShow = 17;
    const slicedData = newData.slice(0, maxBarsToShow);

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 1200 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const svg = d3
      .select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const x = d3.scaleBand().range([0, Math.min(width, maxBarsToShow * 100)]).padding(0.1);
    x.domain(slicedData.map((d) => d.date));

    const y = d3.scaleLinear().range([height, 0]);
    y.domain([0, d3.max(slicedData, (d) => d.value as NumberValue)!]);

    const barsGroup = svg.append('g');

    barsGroup.selectAll('.bar')
      .data(slicedData)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.date)!)
      .attr('width', x.bandwidth())
      .attr('y', (d) => y(d.value)!)
      .attr('height', (d) => height - y(d.value)!)
      .attr('fill', '#8E44AD');

    const lineGroup = svg.append('g');
    const area = d3.area<{ date: string; value: number }>()
      .x((d) => x(d.date)! + x.bandwidth() / 2)
      .y0(height)
      .y1((d) => y(d.value)!)
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(slicedData)
      .attr('class', 'area')
      .attr('d', area)
      .attr('fill', 'rgba(110, 104, 136, 0.3)');

    svg.append('path')
      .datum(slicedData)
      .attr('class', 'line')
      .attr('d', area)
      .attr('fill', 'none')
      .attr('stroke', 'rgb(100, 204, 136)');

    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));
  }
}
