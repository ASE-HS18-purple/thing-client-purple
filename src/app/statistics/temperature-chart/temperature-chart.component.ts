import {Component, OnInit} from '@angular/core';
import {ChartJsComponent} from '../../chart-js/chart-js.component';
import {ChartModel} from '../../model/chart.model';
import {StatisticsService} from '../../service/statistics.service';

@Component({
  selector: 'app-temperature-chart',
  templateUrl: './temperature-chart.component.html',
  styleUrls: ['./temperature-chart.component.css']
})
export class TemperatureChartComponent extends ChartJsComponent implements OnInit {

  constructor(public statisticsService: StatisticsService) {
    super(statisticsService, 'Temperature chart', 'temperatureChart');
  }

  ngOnInit() {
    super.initChartBuild();
  }

  getData(): ChartModel {
    return this.statisticsService.getTemperatureData(super.getFromDate().getTime(), super.getToDate().getTime());
  }


}
