import {Injectable} from '@angular/core';
import {Data} from '@angular/router';
import {Observable, Observer, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Authenticate} from '../authentication/authenticate';

export interface Data {
  timestamp: string,
  property: string,
  value: number,
  connectionState: string
}

@Injectable()
export class ServerSocket {

  websocketURL = 'ws://localhost:3000';
  public subject: Subject<any>;
  private authenticate: Authenticate;
  private webSocket: WebSocket;

  constructor(authenticate: Authenticate) {
    this.authenticate = authenticate;
    this.connect();
    this.subject.pipe(map((response: MessageEvent): Data => {
        let data = JSON.parse(response.data);
      return <Data>data;
    }));
  }

  public connect() {
    if (!this.subject) {
      this.subject = this.create(this.websocketURL);
      this.webSocket.onopen = () => {
        this.subject.next(this.authenticate.currentUser().token);
        console.log('Successfully connected: ' + this.websocketURL);
      };
    }
  }

  private create(url): Subject<any> {
    this.webSocket = new WebSocket(url);
    let observable = Observable.create(
      (obs: Observer<Data>) => {
        this.webSocket.onmessage = obs.next.bind(obs);
        this.webSocket.onerror = obs.error.bind(obs);
        this.webSocket.onclose = obs.complete.bind(obs);
        return this.webSocket.close.bind(this.webSocket);
      });
    let observer = {
      next: (data: Object) => {
        if (this.webSocket.readyState === WebSocket.OPEN) {
          this.webSocket.send(JSON.stringify(data));
        }
      }
    };
    return Subject.create(observer, observable);
  }

}
