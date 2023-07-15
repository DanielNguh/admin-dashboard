import { of as observableOf, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import {
  ResourcesChartData,
  SystemResourceChart,
} from "../data/resources-chart";
import { ChartsPanelData } from "../data/charts-panel";

@Injectable()
export class ChartsPanelService extends ChartsPanelData {
  constructor(private resourcesChartService: ResourcesChartData) {
    super();
  }

  getResourcesChartData(): Observable<SystemResourceChart> {
    return observableOf(this.resourcesChartService.getResourcesChartData());
  }
}
