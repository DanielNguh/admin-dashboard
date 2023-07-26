import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ContainerInfo, ContainerInfoData } from "../data/container-info";

@Injectable({
  providedIn: "root",
})
export class ContainerInfoService extends ContainerInfoData {
  constructor(private http: HttpClient) {
    super();
  }


  getContainerInfoData(): Observable<ContainerInfo[]> {
    return this.http.get<ContainerInfo[]>("/api/containers");
  }
}
