import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Chart} from 'chart.js';
import {StatisticsService} from '../service/statistics.service';
import {JSONProperty} from '../../../../thingy-api-purple/src/controllers/WebsocketController';
import {ServerSocket} from "../service/server-socket";
import {ChartsComponent} from "../charts/charts.component";
import {ThingyDataEvent} from "../../../../thingy-api-purple/src/service/ThingyNotifyEventDispatchers";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  @ViewChildren(ChartsComponent) charts: QueryList<ChartsComponent>;

  humidity = JSONProperty[JSONProperty.Humidity];
  co2 = JSONProperty[JSONProperty.CO2];
  temperature = JSONProperty[JSONProperty.Temperature];
  pressure = JSONProperty[JSONProperty.Pressure];

  constructor(public statisticsService: StatisticsService, public service: ServerSocket) {
    service.subject.subscribe({next: this.liveUpdateOfChart.bind(this)});
  }

  ngOnInit() {
  }

  liveUpdateOfChart(data: ThingyDataEvent) {
    if (data && data.thingyId) {
      this.charts.forEach((chart: ChartsComponent) => {
        chart.liveUpdateOfChart(data);
      });
    }
  }

}

