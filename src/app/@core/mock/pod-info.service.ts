import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PodInfo, PodInfoData } from "../data/pod-info";

@Injectable({
  providedIn: "root",
})
export class PodInfoService extends  PodInfoData{
  constructor(private http: HttpClient) {
    super();
  }


  getPodInfoData(): Observable<PodInfo[]> {
    return this.http.get<PodInfo[]>("/api/pods");
  }
}
