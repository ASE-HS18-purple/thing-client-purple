import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {UserModel} from '../model/user.model';
import {AuthModel} from '../model/auth.model';
import {Authenticate} from '../authentication/authenticate';
import {ThingyDeviceModel} from '../model/thingy-device.model';
import {ThingyDeviceService} from '../service/thingy-device.service';
import {ThingyOverviewComponent} from "../thingy-overview/thingy-overview.component";
import {ServerSocket} from "../service/server-socket";
import {ThingyDataEvent} from "../../../../thingy-api-purple/src/service/ThingyNotifyEventDispatchers";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private currentUser: AuthModel;
  private thingyDevices: ThingyDeviceModel[];

  @ViewChildren(ThingyOverviewComponent) thingyOverviewComponents: QueryList<ThingyOverviewComponent>;

  constructor(private authService: Authenticate,
              private thingyDeviceService: ThingyDeviceService,
              public serverSocket: ServerSocket) {
    this.currentUser = this.authService.currentUser();
    serverSocket.subject.subscribe({next: this.updateThingyDevicesOverview.bind(this)});
  }

  ngOnInit() {
    this.loadThingyData();
  }

  loadThingyData() {
    this.thingyDeviceService.getAllThingyDevices().subscribe((thingyDevices: ThingyDeviceModel[]) => {
      this.thingyDevices = thingyDevices;
    });
  }

  updateThingyDevicesOverview(data: any) {
    if (data && data.thingy) {
      this.thingyOverviewComponents.forEach((component: ThingyOverviewComponent) => {
        if (component.thingyDevice.id == data.thingy) {
          component.updateThingyOverview(data);
        }
      });
    }
  }

}
