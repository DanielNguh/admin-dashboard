import { Observable } from "rxjs";

export interface SystemResource {
  resource: string;
  value: number;
  timeStamp: Date;
}
export abstract class ResourcesChartData {
  abstract getResourcesChartData(): Observable<SystemResource[]>;
}
