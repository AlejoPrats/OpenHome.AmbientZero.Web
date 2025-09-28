import { Component, ViewChild, inject } from '@angular/core';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, NgApexchartsModule } from "ng-apexcharts";
import { TemperatureService } from '../services/temperature.service';
import { MeasurementLog } from '../interfaces/measurement-log';
import * as _ from 'lodash';
import { ChartData } from '../classes/chart-data';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-temperature-chart',
  imports: [NgApexchartsModule],
  standalone: true,
  templateUrl: './temperature-chart.component.html',
  styleUrl: './temperature-chart.component.css'
})

export class TemperatureChartComponent {

  @ViewChild('chart', { static: false }) chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  temperatureService: TemperatureService = inject(TemperatureService);
  measurements: MeasurementLog[] = [];

  constructor() {

    this.chartOptions = {
      series: [],
      chart: {
        height: 1000,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Daily Temperature Graph",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        type: 'datetime'
      },
      tooltip: {
        custom: function (val) {
          let date = new Date(val.w.globals.seriesX[val.seriesIndex][val.dataPointIndex]);
          let time = date.toISOString().split('T')[1].split(':');
          return `<span class='apexcharts-tooltip-title'>` + val.w.globals.seriesNames[val.seriesIndex] + `</span>
          <row class='mb-1';><span>&nbsp;Time: `+ time[0] + ':' + time[1] + `&nbsp;</span></row>
          <row class='mb-1'><span>&nbsp;Temperature: `+ val.w.globals.series[val.seriesIndex][val.dataPointIndex] + `&nbsp;</span></row>`
        }
      }
    };

    this.temperatureService.getDailyMeasurements().subscribe(measurementLogs => {
      this.measurements = measurementLogs;
      this.generateChartSeries(_.groupBy(this.measurements, 'deviceId'));

    });
  }

  generateChartSeries(params: Record<string, MeasurementLog[]>) {

    let chartData: ChartData[] = [];

    for (var key in params) {
      let data = new ChartData();
      data.name = params[key][0].sensorVirtualName ?? key;


      params[key].forEach(sensorData => {
        let array = []
        array.push(new Date(sensorData.date).getTime());
        array.push(sensorData.temperature);
        data.serie?.push(array);
      })

      chartData.push(data);
    }

    for (var serie in chartData) {
      this.chartOptions.series?.push({
        name: chartData[serie].name,
        group: 'string',
        zIndex: 2,
        hidden: false,
        data: chartData[serie].serie //_.map(params[key],'temperature'),
      });
    }

    this.chart.render();
  }
}
