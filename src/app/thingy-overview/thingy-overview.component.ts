import {Component, Input, OnInit} from '@angular/core';
import {ThingyDeviceModel} from '../model/thingy-device.model';
import {ThingyDataEvent} from '../../../../thingy-api-purple/src/service/ThingyNotifyEventDispatchers';
import * as moment from 'moment';
import {JSONProperty} from '../../../../thingy-api-purple/src/controllers/WebsocketController';

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
    this.values = new ThingyOverviewValues();
  }

  updateThingyOverview(data: any) {
    if (data) {
      switch (data.property) {
        case JSONProperty.Temperature:
          this.values.temperatureLastVal = data.value;
          break;
        case JSONProperty.Pressure:
          this.values.pressureLastVal = data.value;
          break;
        case JSONProperty.Humidity:
          this.values.humidityLastVal = data.value;
          break;
        case JSONProperty.CO2:
          this.values.co2LastVal = data.value;
          break;
      }
    }
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
}
