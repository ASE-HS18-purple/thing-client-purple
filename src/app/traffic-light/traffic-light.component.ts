import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Timeouts} from 'selenium-webdriver';
import {ViewRef_} from "../../../node_modules/@angular/core/src/view";

enum TrafficLightStatus {
  GREEN = 'green', ORANGE = 'orange', RED = 'red', INACTIVE = 'inactive'
}

@Component({
  selector: 'app-traffic-light',
  templateUrl: './traffic-light.component.html',
  styleUrls: ['./traffic-light.component.css']
})

export class TrafficLightComponent implements OnInit {

  protected lastUpdate: number;
  protected status: TrafficLightStatus;
  protected nextTimeout;
  private times: Map<number, TrafficLightStatus>;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.lastUpdate = 0;
    this.status = TrafficLightStatus.INACTIVE;
    this.times = new Map();
    this.times.set(0, TrafficLightStatus.GREEN);
    this.times.set(5, TrafficLightStatus.ORANGE);
    this.times.set(30, TrafficLightStatus.RED);
    this.times.set(300, TrafficLightStatus.INACTIVE);
  }

  init() {}

  update() {
    this.lastUpdate = new Date().getTime();
    this.clearTimer();
    this.updateStatus();
  }

  private clearTimer() {
    if (this.nextTimeout) {
      clearTimeout(this.nextTimeout);
    }
  }

  private updateStatus() {
    let now = new Date().getTime();
    let difference = (now - this.lastUpdate) / 1000;
    let iterator = this.times.entries();
    let currentValue = iterator.next();
    let newState: TrafficLightStatus;
    let nextIn: number;
    while (!currentValue.done && currentValue.value[0] <= difference) {
      newState = currentValue.value[1];
      currentValue = iterator.next();
    }
    this.status = newState;
    if (this.status != TrafficLightStatus.INACTIVE) {
      nextIn = currentValue.value[0] - difference;
      this.nextTimeout = setTimeout(this.updateStatus.bind(this), nextIn * 1000);
    }
    if (this.cd && !(this.cd as ViewRef_).destroyed) {
      this.cd.detectChanges();
    }
  }

}
