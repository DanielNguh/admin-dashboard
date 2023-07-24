import { Observable } from "rxjs";

export interface SystemResource {
  resource: string;
  value: number;
  createdAt: Date;
}

export abstract class ResourcesChartData {
  abstract getResourcesChartData(): Observable<SystemResource[]>;
}
