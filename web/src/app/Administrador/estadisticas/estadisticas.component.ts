import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  NgApexchartsModule,
} from "ng-apexcharts";
import { EstadisticasService } from './estadisiticas.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [NgApexchartsModule,FormsModule],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  public series: ApexAxisChartSeries;
  public chart: ApexChart;
  public dataLabels: ApexDataLabels;
  public markers: ApexMarkers;
  public title: ApexTitleSubtitle;
  public fill: ApexFill;
  public yaxis: ApexYAxis;
  public xaxis: ApexXAxis;
  public tooltip: ApexTooltip;
fecha
  estadisticas: any[] = [];
  base = environment.URL;
  private baseUrl = `${this.base}estadisticas`;

  constructor(private http: HttpClient , private est:EstadisticasService) {
   
  }

  

  ngOnInit(): void {
     this.fecha = Date.now()
    // Llamada HTTP para obtener los datos
    this.http.get<any[]>(this.baseUrl).subscribe({
      next: (data) => {
       
        this.estadisticas = data; 
          this.initChartData();
        this.processData(); 
      },
      error: (err) => {
        console.error("Error al cargar los datos:", err);
      },
    });
  }

generar_informe(){
console.log(this.fecha)
  this.est.imprimir_estadisticas_ingreso().subscribe((e)=>{
    this.est.generateExcel(e)

  })

}

  private processData(): void {
    if (!this.estadisticas || this.estadisticas.length === 0) {
      return; // Verifica si hay datos antes de procesarlos
    }

    // Agrupar por fecha y contar ocurrencias
    const groupedData = this.estadisticas.reduce((acc, item) => {
      const date = item.fecha.split('T')[0]; // Extraer solo la fecha (sin hora)
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    // Convertir a formato {x: fecha, y: cantidad}
    const chartData = Object.keys(groupedData).map(date => ({
      x: date,
      y: groupedData[date],
    }));

    // Actualizar la serie del gráfico
    this.series = [
      {
        name: "Ingresos",
        data: chartData,
      },
    ];
  }

  private initChartData(): void {
    this.chart = {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    };
    this.dataLabels = {
      enabled: false,
    };
    this.markers = {
      size: 5,
    };
    this.title = {
      text: "Ingresos por Fecha",
      align: "left",
    };
    this.fill = {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    };
    this.yaxis = {
      title: {
        text: "Cantidad de Ingresos",
      },
    };
    this.xaxis = {
      type: "datetime",
      labels: {
        format: "yyyy-MM-dd",
      },
    };
    this.tooltip = {
      shared: true,
      x: {
        format: "yyyy-MM-dd",
      },
    };
  }
}
