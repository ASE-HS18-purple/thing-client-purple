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

  times: ThingyOverViewTimes;
  values: ThingyOverviewValues;

  ngOnInit() {
    this.times = new ThingyOverViewTimes();
    this.times.temperatureLastTime = this.thingyDevice.lastTimes[JSONProperty.Temperature] ?
      moment(this.thingyDevice.lastTimes[JSONProperty.Temperature]).fromNow() : 'N/A';
    this.times.temperatureLastSeconds = this.thingyDevice.lastTimes[JSONProperty.Temperature];
    this.times.pressureLastTime = this.thingyDevice.lastTimes[JSONProperty.Pressure] ?
      moment(this.thingyDevice.lastTimes[JSONProperty.Pressure]).fromNow() : 'N/A';
    this.times.pressureLastSeconds = this.thingyDevice.lastTimes[JSONProperty.Pressure];
    this.times.humidityLastTime = this.thingyDevice.lastTimes[JSONProperty.Humidity] ?
      moment(this.thingyDevice.lastTimes[JSONProperty.Humidity]).fromNow() : 'N/A';
    this.times.humidityLastSeconds = this.thingyDevice.lastTimes[JSONProperty.Humidity];
    this.times.co2LastTime = this.thingyDevice.lastTimes[JSONProperty.CO2] ?
      moment(this.thingyDevice.lastTimes[JSONProperty.CO2]).fromNow() : 'N/A';
    this.times.co2LastSeconds = this.thingyDevice.lastTimes[JSONProperty.CO2];

    this.values = new ThingyOverviewValues();
    this.values.temperatureLastVal = this.thingyDevice.lastValues[JSONProperty.Temperature] ?
      this.thingyDevice.lastValues[JSONProperty.Temperature] : 'N/A';
    this.values.humidityLastVal = this.thingyDevice.lastValues[JSONProperty.Humidity] ?
      this.thingyDevice.lastValues[JSONProperty.Humidity]: 'N/A';
    this.values.pressureLastVal = this.thingyDevice.lastValues[JSONProperty.Pressure] ?
      this.thingyDevice.lastValues[JSONProperty.Pressure]: 'N/A';
    this.values.co2LastVal = this.thingyDevice.lastValues[JSONProperty.CO2] ?
      this.thingyDevice.lastValues[JSONProperty.CO2] : 'N/A';
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
    this.times.temperatureLastTime = this.times.temperatureLastSeconds ?
      moment(this.times.temperatureLastSeconds).fromNow() : 'N/A';
    this.times.humidityLastTime = this.times.humidityLastSeconds ?
      moment(this.times.humidityLastSeconds).fromNow() : 'N/A';
    this.times.pressureLastTime = this.times.pressureLastSeconds ?
      moment(this.times.pressureLastSeconds).fromNow() : 'N/A';
    this.times.co2LastTime = this.times.co2LastSeconds ?
      moment(this.times.co2LastSeconds).fromNow() : 'N/A';

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
