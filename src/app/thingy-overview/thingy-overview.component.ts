import {Component, Input, OnInit} from '@angular/core';
import {ThingyDeviceModel} from "../model/thingy-device.model";

@Component({
  selector: 'app-thingy-overview',
  templateUrl: './thingy-overview.component.html',
  styleUrls: ['./thingy-overview.component.css']
})
export class ThingyOverviewComponent implements OnInit {

  constructor() {
  }

  @Input() private thingyDevice: ThingyDeviceModel;
  private lastValue: number;
  private lastTime;

  ngOnInit() {
  }

}
