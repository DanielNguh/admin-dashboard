import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HostInfo, HostInfoData } from "../data/host-info";
import { HttpClient } from "@angular/common/http";
import { shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class HostInfoService extends HostInfoData {
  getHosts$ = this.http.get<HostInfo[]>("/api/rooms").pipe(shareReplay(1));

  constructor(private http: HttpClient) {
    super();
  }

  public getHostInfo(): Observable<HostInfo[]> {
    return this.http.get<HostInfo[]>("/api/hosts");
  }
}
