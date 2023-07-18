import { Injectable } from "@angular/core";
import {
  SystemResource,
  ResourcesChartData,
  SystemResourceChart,
} from "../data/resources-chart";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ResourcesChartService extends ResourcesChartData {
  ramData: number[] = [];
  ramTime: string[] = [];

  cpuData: number[] = [];
  cpuTime: string[] = [];

  diskData: number[] = [];
  diskTime: string[] = [];

  systemResources: any = [];
  isDataAvailable: boolean = false;

  private data = {
    chartLabel: [],
    linesData: [],
  };

  constructor(private http: HttpClient) {
    super();
    this.data = {
      chartLabel: ["2012", "2013", "2014"],
      linesData: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
    };

    this.getSystemResourcesData().subscribe((value: SystemResource[]) => {
      this.systemResources = value;
      this.extract();
      this.isDataAvailable = true;
      this.logSystemData();
    });
  }

  // getTimeStamps(): string[] {
  //   this.getResourcesChartData()
  //     .pipe(
  //       map((resources) =>
  //         resources.filter((resource) => resource.resource == "RAM")
  //       )
  //     )
  //     .subscribe((data) => {
  //       data.forEach((element) => {
  //         let newElement = new Date(element.createdAt);
  //         this.timeStamps.push(
  //           [
  //             newElement.getFullYear(),
  //             newElement.getMonth(),
  //             newElement.getDate(),
  //           ].join("/")
  //         );
  //       });
  //     });
  //   return this.timeStamps;
  // }

  public extract() {
    this.systemResources.forEach((resource) => {
      resource.resource === "RAM"
        ? this.ramData.push(resource.value)
        : resource.resource === "CPU"
        ? this.cpuData.push(resource.value)
        : this.diskData.push(resource.value);
    });
  }

  public logSystemData() {
    if (this.isDataAvailable) {
      console.log(this.ramData);
    }
  }

  getSystemResourcesData(): Observable<SystemResource[]> {
    return this.http.get<SystemResource[]>("/api/resources");
  }

  getResourcesChartData(): SystemResourceChart {
    return this.data;
  }
}
