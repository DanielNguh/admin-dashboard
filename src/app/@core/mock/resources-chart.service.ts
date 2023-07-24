import { Injectable } from "@angular/core";
import { SystemResource, ResourcesChartData } from "../data/resources-chart";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ResourcesChartService extends ResourcesChartData {
  constructor(private http: HttpClient) {
    super();
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

  getResourcesChartData(): Observable<SystemResource[]> {
    return this.http.get<SystemResource[]>("/api/resources");
  }
}
