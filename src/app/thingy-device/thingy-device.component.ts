import {Component, OnInit} from '@angular/core';
import {ThingyDeviceService} from '../service/thingy-device.service';
import {ThingyDeviceModel} from '../model/thingy-device.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfigureThingyDeviceComponent} from './configure-thingy-device/configure-thingy-device.component';
import {EditThingyDeviceComponent} from './edit-thingy-device/edit-thingy-device.component';

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

  openConfigureThingyDeviceModal() {
    const configureNewThingyModalRef = this.modalService.open(ConfigureThingyDeviceComponent, {size: 'lg'});
    configureNewThingyModalRef.componentInstance.reloadTable.subscribe(() => {
      this.loadThingyDevicesData();
    });
  }

  openEditThingyDeviceModal(id: string) {
    const editThingyDeviceModalRef = this.modalService.open(EditThingyDeviceComponent, {size: 'lg'});
    editThingyDeviceModalRef.componentInstance.reloadData.subscribe(() => {
      this.loadThingyDevicesData();
    });
    editThingyDeviceModalRef.componentInstance.id = id;
  }
}
