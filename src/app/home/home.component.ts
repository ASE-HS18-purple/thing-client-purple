import {Component, OnInit} from '@angular/core';
import {UserModel} from '../model/user.model';
import {AuthModel} from '../model/auth.model';
import {Authenticate} from '../authentication/authenticate';
import {ThingyDeviceModel} from '../model/thingy-device.model';
import {ThingyDeviceService} from '../service/thingy-device.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private currentUser: AuthModel;
  thingyDevices: ThingyDeviceModel[];
  contactingServer = false;

  constructor(private thingyDeviceService: ThingyDeviceService, private authService: Authenticate) {
    this.currentUser = this.authService.currentUser();
  }

  ngOnInit() {
    this.loadThingyDevicesData();
  }

  loadThingyDevicesData() {
    this.contactingServer = true;
    this.thingyDeviceService.getAllThingyDevicesWithLastUpdate()
      .subscribe((data: ThingyDeviceModel[]) => {
        this.thingyDevices = data;
        this.contactingServer = false;
        console.log(this.thingyDevices);
      });
  }
}
