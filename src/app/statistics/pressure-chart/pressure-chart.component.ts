import {Component, OnInit} from '@angular/core';
import {ChartJsComponent} from '../../chart-js/chart-js.component';
import {StatisticsService} from '../../service/statistics.service';
import {ChartModel} from '../../model/chart.model';

@Component({
  selector: 'app-pressure-chart',
  templateUrl: './pressure-chart.component.html',
  styleUrls: ['./pressure-chart.component.css']
})
export class PressureChartComponent extends ChartJsComponent implements OnInit {

  constructor(public statisticsServices: StatisticsService) {
    super(statisticsServices, 'Pressure chart', 'pressureChart');
  }

  ngOnInit() {
    this.initChartBuild(true);
  }

  getData(): ChartModel {
    this.statisticsService
      .getPressureData(super.getFromDate().getTime(), super.getToDate().getTime())
      .subscribe((chartData: ChartModel) => {
        console.log('CHART DATA = ', chartData);
        this.chartData = chartData;
        this.chart = this.buildChart(this.property, this.chartId);
      });
    return null;
  }

}
