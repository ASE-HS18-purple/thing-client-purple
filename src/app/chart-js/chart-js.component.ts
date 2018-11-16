import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {ChartModel} from '../model/chart.model';
import {StatisticsService} from '../service/statistics.service';
import {from} from 'rxjs';

export abstract class ChartJsComponent implements OnInit {

  chart: Chart;

  public fromDate: Date;
  public fromTime: Date;

  public toDate: Date;
  public toTime: Date;

  protected constructor(public statisticsService: StatisticsService, public property: string, public chartId: string) {
  }

  ngOnInit(): void {
  }

  initChartBuild() {
    this.setInitialDate();
    const temperatureChartData = this.getData();
    this.chart = this.buildChart(this.property, this.chartId, temperatureChartData);
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

  setInitialDate() {
    this.fromDate = new Date();
    this.fromDate.setHours(0, 0, 0);

    this.fromTime = new Date();
    this.fromTime.setHours(0, 0, 0);

    this.toDate = new Date();
    this.toTime = new Date();
  }

  abstract getData(): ChartModel;

  getFromDate() {
    return this.fromDate;
  }

  getToDate() {
    return this.toDate;
  }

  handleFromDate(fromDate) {
    this.fromDate = fromDate;
    console.log(this.property, ' Handled from date = ', this.fromDate);
  }

  handleEndDate(toDate) {
    this.toDate = toDate;
    console.log(this.property, ' Handled to date = ', this.toDate);
  }

  handleFromTime(fromTime) {
    this.fromTime = fromTime;
    console.log(this.property, ' Handled from time = ', this.fromTime);
  }

  handleToTime(toTime) {
    this.toTime = toTime;
    console.log(this.property, ' Handled to time = ', this.toTime);
  }

}
