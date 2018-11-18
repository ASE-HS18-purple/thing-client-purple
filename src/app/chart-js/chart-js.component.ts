import {AfterViewInit, Component, ContentChild, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Chart} from 'chart.js';
import {ChartModel} from '../model/chart.model';
import {StatisticsService} from '../service/statistics.service';
import {from} from 'rxjs';
import {DatetimePickerComponent} from '../datetime-picker/datetime-picker.component';

export abstract class ChartJsComponent implements OnInit {

  chart: Chart;
  chartData: ChartModel;

  public fromDate: Date;
  public fromTime: Date;

  public toDate: Date;
  public toTime: Date;

  @ViewChildren(DatetimePickerComponent) dtPickerControls: QueryList<DatetimePickerComponent>;
  disabledTimeControls = false;

  protected constructor(public statisticsService: StatisticsService, public property: string, public chartId: string) {
  }

  ngOnInit(): void {
  }

  initChartBuild() {
    this.setInitialDate();
    this.getData();
  }

  buildChart(label: string, chartId: string): Chart {
    const labels: string[] = this.retrieveLabels(this.chartData);
    let propertyValues: number[] = [];
    const propertyData: { label: string, data: number[], borderColor: string, fill: boolean }[] = [];
    this.chartData.datasets.forEach(dataset => {
      dataset.properties.forEach(value => {
        propertyValues.push(value.value);
      });
      const color: string = this.generateRandomColor();
      propertyData.push({
        label: dataset.thingyName,
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
        },
        scales: {
          xAxes: {
            type: 'time',
            distribution: 'series',
            ticks: {
              autoSkip: true,
              maxTicksLimit: 20
            }
          }
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
      chart.datasets[0].properties.forEach(data => {
        labels.push(new Date(data.value).getMonth() + '');
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
  }

  handleEndDate(toDate) {
    this.toDate = toDate;
  }

  handleFromTime(fromTime) {
    this.fromTime = fromTime;
  }

  handleToTime(toTime) {
    this.toTime = toTime;
  }

  toggleControls() {
    this.disabledTimeControls = !this.disabledTimeControls;
    this.dtPickerControls.forEach(control => {
      control.disabled = this.disabledTimeControls;
    });
  }

}
