import {Component, OnInit} from '@angular/core';
import {ServerSocket} from '../service/server-socket';
import {JSONProperty} from '../../../../backend/src/controllers/WebsocketController';

enum MqttConnectionState {
  Connected = "Connected",
  Reconnecting = "Reconnecting",
  Disconnected = "Disconnected",
  Error = "Error"
}

@Component({
  selector: 'app-mqtt-broker-connection',
  templateUrl: './mqtt-broker-connection.component.html',
  styleUrls: ['./mqtt-broker-connection.component.css'],
  providers: [ServerSocket]
})
export class MqttBrokerConnectionComponent implements OnInit {

  connectionState: MqttConnectionState;
  connectionStateEnum = MqttConnectionState;

  constructor(public service: ServerSocket) {
    service.subject.subscribe(this.setConnectionState.bind(this));
    this.connectionState = MqttConnectionState.Disconnected;
  }

  ngOnInit(): void {
  }

  setConnectionState(data: any) {
    if (data.property == JSONProperty.MQTT) {
      this.connectionState = data.mqttState;
    }
  }
}
