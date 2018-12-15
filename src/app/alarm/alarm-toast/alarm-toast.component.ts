import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServerSocket} from '../../service/server-socket';

@Component({
  selector: 'app-alarm-toast',
  templateUrl: './alarm-toast.component.html',
  styleUrls: ['./alarm-toast.component.css']
})
export class AlarmToastComponent implements OnInit, OnDestroy {

  constructor(public serverSocket: ServerSocket) {
    serverSocket.subject.subscribe({next: this.handleAlarmEvent.bind(this)});
  }

  ngOnInit() {
    console.log('On init');
  }

  ngOnDestroy(): void {
    console.log('On destroy');
  }

  handleAlarmEvent(data: any) {
    console.log('DATA FROM NAV = ', data);
  }

}
