import {Injectable} from '@angular/core';
import {HttpClient} from '../../../node_modules/@angular/common/http';
import {AlarmModel} from "../model/alarm.model";

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  private basicURI = 'http://localhost:3000/alarm';

  constructor(public httpClient: HttpClient) {
  }

  setupAlarm(alarm: AlarmModel) {
    return this.httpClient.post(this.basicURI, alarm);
  }

  getAllAlarms() {
    return this.httpClient.get(this.basicURI);
  }

}
