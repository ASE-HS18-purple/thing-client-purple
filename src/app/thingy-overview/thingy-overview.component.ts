import {Component, Input, OnInit} from '@angular/core';
import {ThingyDeviceModel} from '../model/thingy-device.model';
import {ThingyDataEvent} from '../../../../thingy-api-purple/src/service/ThingyNotifyEventDispatchers';
import * as moment from 'moment';
import {JSONProperty} from '../../../../thingy-api-purple/src/controllers/WebsocketController';
import {interval} from "rxjs";

@Component({
  selector: 'app-thingy-overview',
  templateUrl: './thingy-overview.component.html',
  styleUrls: ['./thingy-overview.component.css']
})
export class ThingyOverviewComponent implements OnInit {

  constructor() {
  }

  @Input() thingyDevice: ThingyDeviceModel;

  private times: ThingyOverViewTimes;
  private values: ThingyOverviewValues;

  ngOnInit() {
    this.times = new ThingyOverViewTimes();
    this.times.temperatureLastTime = moment(this.thingyDevice.lastTimes[JSONProperty.Temperature]).fromNow();
    this.times.temperatureLastSeconds = this.thingyDevice.lastTimes[JSONProperty.Temperature];
    this.times.pressureLastTime = moment(this.thingyDevice.lastTimes[JSONProperty.Pressure]).fromNow();
    this.times.pressureLastSeconds = this.thingyDevice.lastTimes[JSONProperty.Pressure];
    this.times.humidityLastTime = moment(this.thingyDevice.lastTimes[JSONProperty.Humidity]).fromNow();
    this.times.humidityLastSeconds = this.thingyDevice.lastTimes[JSONProperty.Humidity];
    this.times.co2LastTime = moment(this.thingyDevice.lastTimes[JSONProperty.CO2]).fromNow();
    this.times.co2LastSeconds = this.thingyDevice.lastTimes[JSONProperty.CO2];

    console.log(this.times.temperatureLastSeconds);
    this.values = new ThingyOverviewValues();
    this.values.temperatureLastVal = this.thingyDevice.lastValues[JSONProperty.Temperature];
    this.values.humidityLastVal = this.thingyDevice.lastValues[JSONProperty.Humidity];
    this.values.pressureLastVal = this.thingyDevice.lastValues[JSONProperty.Pressure];
    this.values.co2LastVal = this.thingyDevice.lastValues[JSONProperty.CO2];
    interval(5000).subscribe(() => {
      this.monitorTime();
    });
  }

  updateThingyOverview(data: any) {
    if (data) {
      switch (data.property) {
        case JSONProperty.Temperature:
          this.values.temperatureLastVal = data.value;
          this.times.temperatureLastTime = moment(data.timestamp).fromNow();
          this.times.temperatureLastSeconds = data.timestamp;
          break;
        case JSONProperty.Pressure:
          this.values.pressureLastVal = data.value;
          this.times.pressureLastTime = moment(data.timestamp).fromNow();
          this.times.pressureLastSeconds = data.timestamp;
          break;
        case JSONProperty.Humidity:
          this.values.humidityLastVal = data.value;
          this.times.humidityLastTime = moment(data.timestamp).fromNow();
          this.times.humidityLastSeconds = data.timestamp;
          break;
        case JSONProperty.CO2:
          this.values.co2LastVal = data.value;
          this.times.co2LastTime = moment(data.timestamp).fromNow();
          this.times.co2LastSeconds = data.timestamp;
          break;
      }
    }
  }

  monitorTime() {
    this.times.temperatureLastTime = this.times.temperatureLastTime ? moment(this.times.temperatureLastSeconds).fromNow() : null;
    this.times.humidityLastTime = this.times.humidityLastTime ? moment(this.times.humidityLastSeconds).fromNow() : null;
    this.times.pressureLastTime = this.times.pressureLastTime ? moment(this.times.pressureLastSeconds).fromNow() : null;
    this.times.co2LastTime = this.times.co2LastTime ? moment(this.times.co2LastSeconds).fromNow() : null;

  }

}

class ThingyOverviewValues {

  constructor() {
  }

  temperatureLastVal: number;
  pressureLastVal: number;
  humidityLastVal: number;
  co2LastVal: number;

}

class ThingyOverViewTimes {

  constructor() {
  }

  temperatureLastTime: string;
  pressureLastTime: string;
  humidityLastTime: string;
  co2LastTime: string;

  temperatureLastSeconds: number;
  pressureLastSeconds: number;
  humidityLastSeconds: number;
  co2LastSeconds: number;

}
