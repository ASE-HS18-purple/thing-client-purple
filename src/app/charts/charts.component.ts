import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ChartModel} from '../model/chart.model';
import {DatetimePickerComponent} from '../datetime-picker/datetime-picker.component';
import {StatisticsService} from '../service/statistics.service';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {Chart} from 'chart.js';
import {JSONProperty} from "../../../../thingy-api-purple/src/controllers/WebsocketController";

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

  liveModeOn: boolean = false;

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
    let propertyValues: { x: Date, y: number }[] = [];
    const propertyData: { label: string, data: { x: Date, y: number }[], borderColor: string, fill: boolean }[] = [];
    this.chartData.datasets.forEach(dataset => {
      dataset.properties.forEach(value => {
        propertyValues.push({x: new Date(value.time), y: value.value});
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
        datasets: propertyData,
      },
      showLine: true,
      options: {
        elements: {
          point: {
            radius: 0,
          }
        },
        title: {
          display: true,
          text: label
        },
        scales: {
          xAxes: [{
            type: 'time',
            distribution: 'linear',
            ticks: {
              autoSkip: true,
              maxTicksLimit: 20,
            },
          }]
        }
      }
    });
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

  getData() {
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
    this.liveModeOn = !this.liveModeOn;
    this.chartData.datasets.forEach(dataset => {
      dataset.properties = [];
    });
    this.chart.destroy();
    if (this.liveModeOn) {
    } else {
      this.getData();
    }
    this.chart = this.buildChart(this.property, this.canvasId);
  }

  liveUpdateOfChart(data: any) {
    if (this.liveModeOn && data.thingyId) {
      this.chartData.datasets.forEach(dataset => {
        if (dataset.id === data.thingyId) {
          if (data.property === JSONProperty[this.property]) {
            if (dataset.properties && dataset.properties[0]) {
              const oldestProperty = dataset.properties[0];
              const now = new Date().getTime();
              const twoMinutesInMillis: number = 2 * 60 * 1000;
              if (now - Number(oldestProperty.time) > twoMinutesInMillis) {
                dataset.properties.splice(0, 1);
              }
            }
            dataset.properties.push({value: data.value, time: data.timestamp});
            this.chart.destroy();
            this.chart = this.buildChart(this.property, this.canvasId);
          }
        }
      });
    }
  }

}
