import {Component, OnInit} from '@angular/core';
import {ThingyDeviceService} from '../service/thingy-device.service';
import {ThingyDeviceModel} from '../model/thingy-device.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfigureThingyDeviceComponent} from './configure-thingy-device/configure-thingy-device.component';

@Component({
  selector: 'app-thingy-device',
  templateUrl: './thingy-device.component.html',
  styleUrls: ['./thingy-device.component.css']
})
export class ThingyDeviceComponent implements OnInit {

  thingyDevices: ThingyDeviceModel[];
  contactingServer = false;

  constructor(public thingyDeviceService: ThingyDeviceService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.loadThingyDevicesData();
  }

  loadThingyDevicesData() {
    this.contactingServer = true;
    this.thingyDeviceService.getAllThingyDevices()
      .subscribe((data: ThingyDeviceModel[]) => {
        this.thingyDevices = data;
        this.contactingServer = false;
      });
  }

  openModal() {
    const configureNewThingyModalRef = this.modalService.open(ConfigureThingyDeviceComponent, {size: 'lg'});
    configureNewThingyModalRef.componentInstance.reloadTable.subscribe(() => {
      this.loadThingyDevicesData();
    });
  }

}
