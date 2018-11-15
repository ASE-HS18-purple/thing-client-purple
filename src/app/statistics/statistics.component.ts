import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {StatisticsService} from '../service/statistics.service';
import {ChartModel} from '../model/chart.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  temperatureChart: Chart;
  humidityChart: Chart;
  pressureChart: Chart;
  airQualityChart: Chart;

  constructor(public statisticsService: StatisticsService) {
  }

  ngOnInit() {
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0);
    const currentTime = new Date();
    this.buildAllCharts(midnight.getTime(), currentTime.getTime());
  }
  
  buildAllCharts(from: number, to: number) {
    const temperatureChartData = this.statisticsService.getTemperatureData(from, to);
    this.temperatureChart = this.buildChart('Temperature', 'temperatureChart', temperatureChartData);

    const humidityChartData = this.statisticsService.getHumidityData(from, to);
    this.humidityChart = this.buildChart('Humidity', 'humidityChart', humidityChartData);

    const pressureChartData = this.statisticsService.getPressureData(from, to);
    this.pressureChart = this.buildChart('Pressure', 'pressureChart', pressureChartData);

    const airQualityChartData = this.statisticsService.getAirQualityData(from, to);
    this.airQualityChart = this.buildChart('Air Quality', 'airQualityChart', airQualityChartData);
  }

  buildChart(label: string, chartId: string, chartData: ChartModel): Chart {
    const labels: string[] = this.retrieveLabels(chartData);
    let propertyValues: number[] = [];
    const propertyData: { label: string, data: number[], borderColor: string, fill: boolean }[] = [];
    chartData.datasets.forEach(dataset => {
      dataset.data.forEach(value => {
        propertyValues.push(value.value);
      });
      const color: string = this.generateRandomColor();
      propertyData.push({
        label: dataset.thingy,
        data: propertyValues,
        borderColor: color,
        fill: false
      });
      propertyValues = [];
    });
    return new Chart(chartId, {
      type: 'line',
      data: {
        labels: labels,
        datasets: propertyData,
      },
      options: {
        title: {
          display: true,
          text: label
        }
      }
    });
  }

  /**
   * Just retrieve the times from the first dataset initially.
   */
  retrieveLabels(chart: ChartModel): string[] {
    const labels: string[] = [];
    if (chart.datasets[0]) {
      chart.datasets[0].data.forEach(data => {
        labels.push(new Date(data.value).toLocaleTimeString());
      });
    }
    return labels;
  }

  generateRandomColor() {
    const redColor: number = Math.floor(Math.random() * 254) + 1;
    const greenColor: number = Math.floor(Math.random() * 254) + 1;
    const blueColor: number = Math.floor(Math.random() * 254) + 1;
    const color: string = 'rgb(' + redColor + ',' + greenColor + ',' + blueColor + ')';
    return color;
  }

}

