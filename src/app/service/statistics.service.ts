import {Injectable} from '@angular/core';
import {ChartModel} from '../model/chart.model';
import {checkAndUpdateDirectiveDynamic} from '../../../node_modules/@angular/core/src/view/provider';
import {createForJitStub} from '../../../node_modules/@angular/compiler/src/aot/summary_serializer';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor() {
  }

  getTemperatureData(from: number, to: number): ChartModel {
    return this.buildChartModel('Temperature');
  }

  getHumidityData(from: number, to: number) {
    return this.buildChartModel('Humidity');
  }

  getPressureData(from: number, to: number) {
    return this.buildChartModel('Pressure');
  }

  getAirQualityData(from: number, to: number) {
    return this.buildChartModel('Air Quality');
  }

  // TODO: Delete this method after the real API is implemented.
  private generateRandomData() {
    let i: number;
    const dataset = [];
    for (i = 0; i < 25; i++) {
      const value: number = Math.floor(Math.random() * 5) + 1;
      const date = (new Date().getTime()) - 1000000;
      dataset.push({value, date});
    }
    return dataset;
  }

  private buildChartModel(unit: string) {
    const chartModel: ChartModel = new ChartModel();
    chartModel.datasets = [];
    chartModel.unit = 'Temperature';
    chartModel.datasets.push({thingy: 'Thingy one', data: this.generateRandomData()});
    chartModel.datasets.push({thingy: 'Thingy two', data: this.generateRandomData()});
    return chartModel;
  }


}
