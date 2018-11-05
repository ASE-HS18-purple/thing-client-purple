import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MqttBrokerConnectionService {

  private basicURI = 'http://localhost:3000/mqtt/state';

  constructor(private httpClient: HttpClient) {
  }

  public retrieveState() {
    return this.httpClient.get(this.basicURI);
  }

}
