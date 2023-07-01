export interface ResourcesChart {
  chartLabel: string[];
  linesData: number[][];
}

export interface SystemResource {
  resource: string;
  value: number;
  timeStamp: Date;
}
export abstract class ResourcesChartData {
  abstract getResourcesChartData(period: string): ResourcesChart;
}
