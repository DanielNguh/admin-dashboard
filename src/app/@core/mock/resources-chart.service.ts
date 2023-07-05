import { Injectable } from "@angular/core";
import { SystemResource, ResourcesChartData } from "../data/resources-chart";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ResourcesChartService extends ResourcesChartData {
  ramData: SystemResource[] = [];
  cpuData: SystemResource[] = [];
  diskData: SystemResource[] = [];

  constructor(private http: HttpClient) {
    super();
  }

  getRamData(): SystemResource[] {
    this.getResourcesChartData()
      .pipe(
        map((resources) =>
          resources.filter((resource) => resource.resource == "RAM")
        )
      )
      .subscribe((data) => {
        data.forEach((element) => {
          this.ramData.push(element);
        });
      });
    return this.ramData;
  }
  getCpuData(): SystemResource[] {
    this.getResourcesChartData()
      .pipe(
        map((resources) =>
          resources.filter((resource) => resource.resource == "CPU")
        )
      )
      .subscribe((data) => {
        data.forEach((element) => {
          this.cpuData.push(element);
        });
      });
    return this.cpuData;
  }
  getDiskData(): SystemResource[] {
    this.getResourcesChartData()
      .pipe(
        map((resources) =>
          resources.filter((resource) => resource.resource == "Disk")
        )
      )
      .subscribe((data) => {
        data.forEach((element) => {
          this.diskData.push(element);
        });
      });
    return this.diskData;
  }

  getResourcesChartData(): Observable<SystemResource[]> {
    return this.http.get<SystemResource[]>("/api/resources");
  }
}
