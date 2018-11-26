import {Injectable} from '@angular/core';
import {Data} from '@angular/router';
import {Observable, Observer, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Authenticate} from '../authentication/authenticate';

export enum WebSocketState {
  CONNECTING, CONNECTED, RECONNECTING, DISCONNECTED, ERROR
}

@Injectable()
export class ServerSocket {

  websocketURL = 'ws://localhost:3000';
  public subject: Subject<any>;
  private authenticate: Authenticate;
  private webSocket: WebSocket;
  private state: WebSocketState = WebSocketState.DISCONNECTED;

  constructor(authenticate: Authenticate) {
    this.authenticate = authenticate;
    this.state = WebSocketState.CONNECTING;
    this.connect();
    this.subject.pipe(map((response: MessageEvent): Data => {
        let data = JSON.parse(response.data);
      return <Data>data;
    }));
  }

  public connect() {
    if (!this.subject) {
      this.subject = this.create(this.websocketURL);
    }
  }

  private create(url): Subject<any> {
    this.webSocket = new WebSocket(url);
    let observable = Observable.create(
      (obs: Observer<Data>) => {
        this.webSocket.onmessage = message => obs.next(JSON.parse(message.data));
        this.webSocket.onerror = obs.error.bind(obs);
        this.webSocket.onclose = obs.complete.bind(obs);
        this.webSocket.onopen = () => {
          this.state = WebSocketState.CONNECTED;
          this.subject.next(this.authenticate.currentUser().user.username);
        };
        return this.webSocket.close.bind(this.webSocket);
      });
    let observer = {
      next: (data: Object) => {
        if (this.webSocket.readyState === WebSocket.OPEN) {
          this.webSocket.send(JSON.stringify(data));
        }
      },
      error: () => {
        this.state = WebSocketState.ERROR;
      },
      complete: () => {
        this.state = WebSocketState.DISCONNECTED;
          setTimeout(() => {
            this.state = WebSocketState.RECONNECTING;
            this.connect();
          }, 1000);
      }
    };
    return Subject.create(observer, observable);
  }

}
