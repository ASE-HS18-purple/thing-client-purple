import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SetupAlarmComponent} from "./setup-alarm/setup-alarm.component";
import {AlarmModel} from "../model/alarm.model";
import {AlarmService} from "../service/alarm.service";
import * as moment from 'moment';
import {interval} from "rxjs";

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {

  alarms: AlarmModel[] = [];

  constructor(private modalService: NgbModal, private service: AlarmService) {
  }

  ngOnInit() {
    this.loadAlarms();
    interval(5000).subscribe(() => {
      if (this.alarms) {
        this.alarms.forEach((alarm: AlarmModel) => {
          alarm.triggerTimeFormatted = moment(alarm.triggerTime).fromNow();
        });
      }
    });
  }

  private loadAlarms() {
    this.service.getAllAlarms().subscribe((alarms: AlarmModel[]) => {
      this.alarms = alarms;
      if (this.alarms) {
        this.alarms.forEach((alarm: AlarmModel) => {
          alarm.triggerTimeFormatted = moment(alarm.triggerTime).fromNow();
        });
      }
    });
  }

  openSetupAlarm() {
    const setupAlarmCompModalReference = this.modalService.open(SetupAlarmComponent, {size: 'lg'});
  }

}
