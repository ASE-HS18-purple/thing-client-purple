 import {Component, OnInit} from '@angular/core';
import {MqttBrokerConnectionService} from '../service/mqtt-broker-connection.service';
import {MqttBrokerConnectionModel} from '../model/mqtt-broker-connection.model';
 import {Data, ServerSocket} from '../service/server-socket';

@Component({
  selector: 'app-mqtt-broker-connection',
  templateUrl: './mqtt-broker-connection.component.html',
  styleUrls: ['./mqtt-broker-connection.component.css'],
  providers: [ ServerSocket ]
})
export class MqttBrokerConnectionComponent implements OnInit {

  connectionState: string;

  constructor(public service: ServerSocket) {
    service.subject.subscribe(data => this.setConnectionState(<Data>data))
  }

  ngOnInit(): void {}

  setConnectionState(data: Data) {
    console.log(data);
      this.connectionState = data.connectionState;
  }
}
