import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';
import { EstadisticasService } from './estadisiticas.service';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [NgApexchartsModule, FormsModule],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'],
})
export class EstadisticasComponent implements OnInit {
  // Configuración del primer gráfico (estadisticas)
  public seriesIngresos: ApexAxisChartSeries = [];
  public chartIngresos: ApexChart;
  public titleIngresos: ApexTitleSubtitle;
  public yaxisIngresos: ApexYAxis;
  public xaxisIngresos: ApexXAxis;
  public tooltipIngresos: ApexTooltip;

  // Configuración del segundo gráfico (estadisticas_ingreso)
  public seriesPrestamos: ApexAxisChartSeries = [];
  public chartPrestamos: ApexChart;
  public titlePrestamos: ApexTitleSubtitle;
  public yaxisPrestamos: ApexYAxis;
  public xaxisPrestamos: ApexXAxis;
  public tooltipPrestamos: ApexTooltip;

  fecha: string;
  fechaf: string;

  estadisticas: any[] = [];
  estadisticas_ingreso: any[] = [];
  base = environment.URL;
  private baseUrlEstadisticas = `${this.base}estadisticas`;
  private baseUrlEstadisticasIngreso = `${this.base}estadisticas/prestamos`;
  colorsPrestamos: string[];

  constructor(private http: HttpClient, private est: EstadisticasService) {}

  ngOnInit(): void {
    const today = new Date();
    this.fecha = today.toISOString().split('T')[0];
    this.fechaf = today.toISOString().split('T')[0];

    // Obtener datos para el primer gráfico
    this.http.get<any[]>(this.baseUrlEstadisticas).subscribe({
      next: (data) => {
        this.estadisticas = data;
        this.processDataIngresos();
        this.initChartDataIngresos();
      },
      error: (err) => {
        console.error('Error al cargar los datos de estadisticas:', err);
      },
    });

    // Obtener datos para el segundo gráfico
    this.http.get<any[]>(this.baseUrlEstadisticasIngreso).subscribe({
      next: (data) => {
        this.estadisticas_ingreso = data;
        this.processDataPrestamos();
        this.initChartDataPrestamos();
      },
      error: (err) => {
        console.error('Error al cargar los datos de estadisticas_ingreso:', err);
      },
    });
  }

  generar_informe() {
    this.est.imprimir_estadisticas_ingreso(this.fecha, this.fechaf).subscribe((e) => {
      this.est.generateExcel(e);
    });
  }
  generar_informe_prestamos() {
    this.est.imprimir_estadisticas_prestamos(this.fecha, this.fechaf).subscribe((e) => {
      this.est.generateExcelPrestamos(e);
    });
  }

  private processDataIngresos(): void {
    if (!this.estadisticas || this.estadisticas.length === 0) {
      return;
    }

    const groupedData = this.estadisticas.reduce((acc, item) => {
      const date = item.fecha.split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.keys(groupedData).map((date) => ({
      x: date,
      y: groupedData[date],
    }));

    this.seriesIngresos = [
      {
        name: 'Ingresos',
        data: chartData,
      },
    ];
  }

  private processDataPrestamos(): void {
    if (!this.estadisticas_ingreso || this.estadisticas_ingreso.length === 0) {
      return;
    }

    const groupedData = this.estadisticas_ingreso.reduce((acc, item) => {
      const date = item.fecha.split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.keys(groupedData).map((date) => ({
      x: date,
      y: groupedData[date],
    }));

    this.seriesPrestamos = [
      {
        name: 'Prestamos',
        data: chartData,
      },
    ];
  }

  private initChartDataIngresos(): void {
    this.chartIngresos = {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: 'zoom',
      },
    };

    this.titleIngresos = {
      text: 'Ingresos por Fecha',
      align: 'left',
    };

    this.yaxisIngresos = {
      title: {
        text: 'Cantidad de Ingresos',
      },
    };

    this.xaxisIngresos = {
      type: 'datetime',
      labels: {
        format: 'yyyy-MM-dd',
      },
    };

    this.tooltipIngresos = {
      shared: true,
      x: {
        format: 'yyyy-MM-dd',
      },
    };
  }

  private initChartDataPrestamos(): void {
    this.chartPrestamos = {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: 'zoom',
      },
    };

    this.titlePrestamos = {
      text: 'Préstamos por Fecha',
      align: 'left',
    };

    this.yaxisPrestamos = {
      title: {
        text: 'Cantidad de Préstamos',
      },
    };

    this.xaxisPrestamos = {
      type: 'datetime',
      labels: {
        format: 'yyyy-MM-dd',
      },
    };

    this.tooltipPrestamos = {
      shared: true,
      x: {
        format: 'yyyy-MM-dd',
      },
    };


    this.seriesPrestamos = [
      {
        name: 'Préstamos',
        data: this.seriesPrestamos[0]?.data || [],
      },
    ];
  
    this.seriesPrestamos[0]['colors'] = ['#e74c3c']; 

    this.colorsPrestamos = ['#e74c3c']; // Rojo
  }
  
}
