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
    this.initChartBuild();
  }

  getData(): ChartModel {
    return this.statisticsServices.getPressureData(0, 0);
  }

}
