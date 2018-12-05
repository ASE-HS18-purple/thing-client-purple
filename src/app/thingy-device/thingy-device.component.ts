import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ThingyDeviceService} from '../service/thingy-device.service';
import {ThingyDeviceModel} from '../model/thingy-device.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfigureThingyDeviceComponent} from './configure-thingy-device/configure-thingy-device.component';
import {EditThingyDeviceComponent} from './edit-thingy-device/edit-thingy-device.component';
import {TrafficLightComponent} from '../traffic-light/traffic-light.component';
import {ServerSocket} from '../service/server-socket';
import {ThingyDataEvent} from '../../../../thingy-api-purple/src/service/ThingyNotifyEventDispatchers';

@Component({
  selector: 'app-thingy-device',
  templateUrl: './thingy-device.component.html',
  styleUrls: ['./thingy-device.component.css']
})
export class ThingyDeviceComponent implements OnInit, AfterViewInit {

  thingyDevices: ThingyDeviceModel[];
  contactingServer = false;
  trafficLights: Map<string, TrafficLightComponent> = new Map();
  @ViewChildren(TrafficLightComponent) trafficLightsQueryList: QueryList<TrafficLightComponent>;

  constructor(public thingyDeviceService: ThingyDeviceService, private modalService: NgbModal, private socket: ServerSocket) {
    socket.subject.subscribe({next: this.updateThingyStatus.bind(this)});
  }

  updateThingyStatus(data) {
    if (data.hasOwnProperty('thingyId')) {
      const theLight = this.trafficLights.get((<ThingyDataEvent>data).thingyId);
      if (theLight) {
        theLight.update();
      }
    }
  }

  ngOnInit() {
    this.loadThingyDevicesData();
  }

  ngAfterViewInit() {
    this.trafficLightsQueryList.changes.subscribe({
      next: lights => {
        lights.forEach((light, index) => {
          this.trafficLights.set(this.thingyDevices[index].id, light);
          light.init();
        });
      }
    });
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

  deleteThingyDevice(id: string) {
    const question = 'Are you sure you want to delete this thingy device?';
    if (confirm(question)) {
      this.thingyDeviceService.deleteThingyDeviceById(id).subscribe(() => {
        this.loadThingyDevicesData();
      }, error => {
        this.loadThingyDevicesData();
        console.log(error);
      });
    }
  }

}
