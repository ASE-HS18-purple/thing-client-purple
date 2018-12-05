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
  private thingyDevices: ThingyDeviceModel[];

  constructor(private authService: Authenticate, private thingyDeviceService: ThingyDeviceService) {
    this.currentUser = this.authService.currentUser();
  }

  ngOnInit() {
    this.loadThingyData();
  }

  loadThingyData() {
    this.thingyDeviceService.getAllThingyDevices().subscribe((thingyDevices: ThingyDeviceModel[]) => {
      this.thingyDevices = thingyDevices;
      console.log(this.thingyDevices);
    });
  }

}
