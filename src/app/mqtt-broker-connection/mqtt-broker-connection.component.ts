import {Component, OnInit} from '@angular/core';
import {MqttBrokerConnectionService} from '../service/mqtt-broker-connection.service';
import {MqttBrokerConnectionModel} from '../model/mqtt-broker-connection.model';

@Component({
  selector: 'app-mqtt-broker-connection',
  templateUrl: './mqtt-broker-connection.component.html',
  styleUrls: ['./mqtt-broker-connection.component.css']
})
export class MqttBrokerConnectionComponent implements OnInit {

  connectionState: string;

  constructor(public service: MqttBrokerConnectionService) {
  }

  ngOnInit() {
    this.retrieveConnState();
  }

  retrieveConnState() {
    this.service.retrieveState().subscribe((connection: MqttBrokerConnectionModel) => {
      this.connectionState = connection.state;
      setTimeout(this.retrieveConnState(), 1000);
    });
  }

}
