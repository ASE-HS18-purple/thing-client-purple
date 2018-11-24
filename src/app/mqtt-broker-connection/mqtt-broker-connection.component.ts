import {Component, OnInit} from '@angular/core';
import {MqttBrokerConnectionService} from '../service/mqtt-broker-connection.service';
import {MqttBrokerConnectionModel} from '../model/mqtt-broker-connection.model';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-mqtt-broker-connection',
  templateUrl: './mqtt-broker-connection.component.html',
  styleUrls: ['./mqtt-broker-connection.component.css']
})
export class MqttBrokerConnectionComponent implements OnInit {

  connectionState: string;

  retrieveConnectionStateSub: Subscription;


  constructor(public service: MqttBrokerConnectionService) {
  }

  ngOnInit() {
    if (this.retrieveConnectionStateSub) {
      this.retrieveConnectionStateSub.unsubscribe();
    }
    this.retrieveConnectionStateSub = interval(2500).subscribe(() => {
      this.retrieveConnState();
    });
  }

  retrieveConnState() {
    this.service.retrieveState().subscribe((connection: MqttBrokerConnectionModel) => {
      this.connectionState = connection.state;
      console.log('CONNECTION STATE = ', this.connectionState);
    });
  }

}
