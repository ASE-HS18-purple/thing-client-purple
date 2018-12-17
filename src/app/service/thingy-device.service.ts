import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ThingyDeviceModel} from '../model/thingy-device.model';

@Injectable()
export class ThingyDeviceService {

  basicURI = 'http://212.47.239.128:8080/thingy';

  constructor(public httpClient: HttpClient) {
  }

  public getAllThingyDevices() {
    return this.httpClient.get(this.basicURI);
  }

  public configureThingyDevice(thingyDevice: ThingyDeviceModel) {
    return this.httpClient.post(this.basicURI, thingyDevice);
  }

  public findThingyDeviceById(id: string) {
    return this.httpClient.get(this.basicURI + '/' + id);
  }

  public updateThingDevice(thingyDeviceModel: ThingyDeviceModel) {
    return this.httpClient.put(this.basicURI + '/' + thingyDeviceModel.id, thingyDeviceModel);
  }

  public deleteThingyDeviceById(id: string) {
    return this.httpClient.delete(this.basicURI + '/' + id);
  }

}
