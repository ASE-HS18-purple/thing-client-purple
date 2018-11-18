export class ChartModel {
  unit: string;
  datasets: {
    id: string,
    thingyName: string,
    properties: {
      value: number,
      time: string;
    }[]
  }[];
}
