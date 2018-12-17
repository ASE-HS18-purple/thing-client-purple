import {Component, Input, OnInit} from '@angular/core';
import {ThingyDeviceModel} from '../model/thingy-device.model';
import {ThingyDataEvent} from '../../../../thingy-api-purple/src/service/ThingyNotifyEventDispatchers';
import * as moment from 'moment';
import {DataType} from '../../../../thingy-api-purple/src/controllers/WebsocketController';
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
    this.times.temperatureLastTime = this.thingyDevice.lastTimes[DataType.Temperature] ?
      moment(this.thingyDevice.lastTimes[DataType.Temperature]).fromNow() : 'N/A';
    this.times.temperatureLastSeconds = this.thingyDevice.lastTimes[DataType.Temperature];
    this.times.pressureLastTime = this.thingyDevice.lastTimes[DataType.Pressure] ?
      moment(this.thingyDevice.lastTimes[DataType.Pressure]).fromNow() : 'N/A';
    this.times.pressureLastSeconds = this.thingyDevice.lastTimes[DataType.Pressure];
    this.times.humidityLastTime = this.thingyDevice.lastTimes[DataType.Humidity] ?
      moment(this.thingyDevice.lastTimes[DataType.Humidity]).fromNow() : 'N/A';
    this.times.humidityLastSeconds = this.thingyDevice.lastTimes[DataType.Humidity];
    this.times.co2LastTime = this.thingyDevice.lastTimes[DataType.CO2] ?
      moment(this.thingyDevice.lastTimes[DataType.CO2]).fromNow() : 'N/A';
    this.times.co2LastSeconds = this.thingyDevice.lastTimes[DataType.CO2];

    this.values = new ThingyOverviewValues();
    this.values.temperatureLastVal = this.thingyDevice.lastValues[DataType.Temperature] ?
      this.thingyDevice.lastValues[DataType.Temperature] : 'N/A';
    this.values.humidityLastVal = this.thingyDevice.lastValues[DataType.Humidity] ?
      this.thingyDevice.lastValues[DataType.Humidity]: 'N/A';
    this.values.pressureLastVal = this.thingyDevice.lastValues[DataType.Pressure] ?
      this.thingyDevice.lastValues[DataType.Pressure]: 'N/A';
    this.values.co2LastVal = this.thingyDevice.lastValues[DataType.CO2] ?
      this.thingyDevice.lastValues[DataType.CO2] : 'N/A';
    interval(5000).subscribe(() => {
      this.monitorTime();
    });
  }

  updateThingyOverview(data: any) {
    if (data) {
      switch (data.property) {
        case DataType.Temperature:
          this.values.temperatureLastVal = data.value;
          this.times.temperatureLastTime = moment(data.timestamp).fromNow();
          this.times.temperatureLastSeconds = data.timestamp;
          break;
        case DataType.Pressure:
          this.values.pressureLastVal = data.value;
          this.times.pressureLastTime = moment(data.timestamp).fromNow();
          this.times.pressureLastSeconds = data.timestamp;
          break;
        case DataType.Humidity:
          this.values.humidityLastVal = data.value;
          this.times.humidityLastTime = moment(data.timestamp).fromNow();
          this.times.humidityLastSeconds = data.timestamp;
          break;
        case DataType.CO2:
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
