import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ChartModel} from '../model/chart.model';
import {DatetimePickerComponent} from '../datetime-picker/datetime-picker.component';
import {StatisticsService} from '../service/statistics.service';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {


  chart: Chart;
  chartData: ChartModel;

  public fromDate: Date;
  public fromTime: Date;

  public toDate: Date;
  public toTime: Date;

  @ViewChildren(DatetimePickerComponent) dtPickerControls: QueryList<DatetimePickerComponent>;
  disabledTimeControls = false;

  @Input() canvasId: string;
  @Input() checkBoxId: string;
  @Input() property: string;

  constructor(public statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.initChartBuild(false);
  }

  initChartBuild(keepCurrentTime: boolean) {
    // In case I don't want to keep the already configured time, simply set it starting from the start of the current day.
    if (!keepCurrentTime) {
      this.setInitialDate();
    }
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
        const date = new Date(data.time);
        labels.push(date.getDate() + '-' + (date.getMonth() + 1) + ' ' + date.getHours() + ':' + date.getMinutes());
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

  getData(): ChartModel {
    this.statisticsService
      .getData(this.property.toLowerCase(), this.getFromDate().getTime(), this.getToDate().getTime())
      .subscribe((chartData: ChartModel) => {
        console.log('CHART DATA = ', chartData);
        if (this.chart) {
          this.chart.destroy();
        }
        this.chartData = chartData;
        this.chart = this.buildChart(this.property, this.canvasId);
      });
    return null;
  }


  getFromDate() {
    const fromDate = this.fromDate;
    fromDate.setHours(this.fromTime.getHours(), this.fromTime.getMinutes(), this.fromTime.getSeconds());
    return fromDate;
  }

  getToDate() {
    const toDate = this.toDate;
    toDate.setHours(this.toTime.getHours(), this.toTime.getMinutes(), this.toTime.getSeconds());
    return toDate;
  }

  handleFromDate(fromDate: NgbDate) {
    if (fromDate) {
      this.fromDate.setFullYear(fromDate.year, fromDate.month, fromDate.day);
      this.initChartBuild(true);
    }
  }

  handleEndDate(toDate) {
    if (toDate) {
      this.toDate.setFullYear(toDate.year, toDate.month, toDate.day);
      this.initChartBuild(true);
    }
  }

  handleFromTime(fromTime) {
    if (fromTime) {
      this.fromTime.setHours(fromTime.hour, fromTime.minute, fromTime.second);
      this.initChartBuild(true);
    }
  }

  handleToTime(toTime) {
    if (toTime) {
      this.toTime.setHours(toTime.hour, toTime.minute, toTime.second);
      this.initChartBuild(true);
    }
  }

  toggleControls() {
    this.disabledTimeControls = !this.disabledTimeControls;
    this.dtPickerControls.forEach(control => {
      control.disabled = this.disabledTimeControls;
    });
  }

}
