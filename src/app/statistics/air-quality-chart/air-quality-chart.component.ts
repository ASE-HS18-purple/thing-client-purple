import {Component, OnInit} from '@angular/core';
import {ChartJsComponent} from '../../chart-js/chart-js.component';
import {ChartModel} from '../../model/chart.model';
import {StatisticsService} from '../../service/statistics.service';

@Component({
  selector: 'app-air-quality-chart',
  templateUrl: './air-quality-chart.component.html',
  styleUrls: ['./air-quality-chart.component.css']
})
export class AirQualityChartComponent extends ChartJsComponent implements OnInit {

  constructor(public statisticsServices: StatisticsService) {
    super(statisticsServices, 'AirQuality chart', 'airQualityChart');
  }

  ngOnInit() {
    super.initChartBuild();
  }

  getData(): ChartModel {
    return this.statisticsServices.getAirQualityData(0, 0);
  }

}
