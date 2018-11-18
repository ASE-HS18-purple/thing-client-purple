import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {StatisticsService} from '../service/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(public statisticsService: StatisticsService) {
  }

  ngOnInit() {
  }
}

