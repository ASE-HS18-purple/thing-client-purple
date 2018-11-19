import {Component, OnInit} from '@angular/core';
import {ChartJsComponent} from '../../chart-js/chart-js.component';
import {ChartModel} from '../../model/chart.model';
import {StatisticsService} from '../../service/statistics.service';

@Component({
  selector: 'app-humidity-chart',
  templateUrl: './humidity-chart.component.html',
  styleUrls: ['./humidity-chart.component.css']
})
export class HumidityChartComponent extends ChartJsComponent implements OnInit {

  constructor(public statisticsServices: StatisticsService) {
    super(statisticsServices, 'Humidity chart', 'humidityChart');
  }

  ngOnInit() {
    super.initChartBuild(true);
  }

  getData(): ChartModel {
    this.statisticsService
      .getHumidityData(super.getFromDate().getTime(), super.getToDate().getTime())
      .subscribe((chartData: ChartModel) => {
        console.log('CHART DATA = ', chartData);
        this.chartData = chartData;
        this.chart = this.buildChart(this.property, this.chartId);
      });
    return null;
  }

}
