export class ChartModel {
  unit: string;
  datasets: { thingy: string, data: StatModel[] }[];
}

class StatModel {
  value: number;
  datetime: number;
}
