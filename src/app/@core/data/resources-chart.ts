import { Observable } from "rxjs";

export interface SystemResource {
  resource: string;
  value: number;
  createdAt: Date;
}

export interface SystemResourceChart {
  chartLabel: string[];
  linesData: number[][];
}
export abstract class ResourcesChartData {
  abstract getResourcesChartData(): SystemResourceChart;
}
