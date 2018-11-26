import {Injectable} from '@angular/core';
import {ChartModel} from '../model/chart.model';
import {checkAndUpdateDirectiveDynamic} from '../../../node_modules/@angular/core/src/view/provider';
import {createForJitStub} from '../../../node_modules/@angular/compiler/src/aot/summary_serializer';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private basicURI = 'http://localhost:3000/environmental-data';

  constructor(public httpClient: HttpClient) {
  }

  getTemperatureData(from: number, to: number) {
    return this.httpClient.get(this.basicURI + '/temperature?from=' + from + '&to=' + to);
  }

  getHumidityData(from: number, to: number) {
    return this.httpClient.get(this.basicURI + '/humidity?from=' + from + '&to=' + to);
  }

  getPressureData(from: number, to: number) {
    return this.httpClient.get(this.basicURI + '/pressure?from=' + from + '&to=' + to);
  }

  getAirQualityData(from: number, to: number) {
    return this.httpClient.get(this.basicURI + '/co2?from=' + from + '&to=' + to);
  }

  getData(property: string, from: number, to: number) {
    return this.httpClient.get(this.basicURI + '/' + property + '?from=' + from + '&to=' + to);
  }

}
