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
  cpuData: number[] = [];
  diskData: number[] = [];
  timeStamps: string[] = [];

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
  // getRamData(): number[] {
  //   this.getResourcesChartData()
  //     .pipe(
  //       map((resources) =>
  //         resources.filter((resource) => resource.resource == "RAM")
  //       )
  //     )
  //     .subscribe((data) => {
  //       data.forEach((element) => {
  //         this.ramData.push(element.value);
  //       });
  //     });
  //   return this.ramData;
  // }
  // getCpuData(): number[] {
  //   this.getResourcesChartData()
  //     .pipe(
  //       map((resources) =>
  //         resources.filter((resource) => resource.resource == "CPU")
  //       )
  //     )
  //     .subscribe((data) => {
  //       data.forEach((element) => {
  //         this.cpuData.push(element.value);
  //       });
  //     });
  //   return this.cpuData;
  // }
  // getDiskData(): number[] {
  //   this.getResourcesChartData()
  //     .pipe(
  //       map((resources) =>
  //         resources.filter((resource) => resource.resource == "Disk")
  //       )
  //     )
  //     .subscribe((data) => {
  //       data.forEach((element) => {
  //         this.diskData.push(element.value);
  //       });
  //     });
  //   return this.diskData;
  // }

  getSystemResourcesData(): Observable<SystemResource[]> {
    return this.http.get<SystemResource[]>("/api/resources");
  }

  getResourcesChartData(): SystemResourceChart {
    return this.data;
  }
}
