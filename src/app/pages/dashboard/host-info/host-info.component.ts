import { Component, OnDestroy } from "@angular/core";
import { HostInfo } from "../../../@core/data/host-info";
import { filter, map, takeWhile } from "rxjs/operators";
import { HostInfoService } from "app/@core/mock/host-info.service";

@Component({
  selector: "ngx-host-info",
  styleUrls: ["./host-info.component.scss"],
  templateUrl: "./host-info.component.html",
})
export class HostInfoComponent implements OnDestroy {
  private alive = true;

  hostInfoData: HostInfo[];
  hostCount: number;
  connectedHosts: number;
  disconnectedHosts: number;
  percentConnected: number;
  percentDisconnected: number;

  hostCount$ = this.hostInfoService
    .getHostInfo()
    .pipe(
      takeWhile(() => this.alive),
      map((hosts) => hosts.length)
    )
    .subscribe((value) => {
      this.hostCount = value;
    });

  connectedHosts$ = this.hostInfoService
    .getHostInfo()
    .pipe(
      takeWhile(() => this.alive),
      map((hosts) => hosts.filter((host) => host.connected === true).length)
    )
    .subscribe((value) => {
      this.connectedHosts = value;
      this.percentConnected = (this.connectedHosts / this.hostCount) * 100;
    });

  disconnectedHosts$ = this.hostInfoService
    .getHostInfo()
    .pipe(
      takeWhile(() => this.alive),
      map((hosts) => hosts.filter((host) => host.connected === false).length)
    )
    .subscribe((value) => {
      this.disconnectedHosts = value;
      this.percentDisconnected =
        (this.disconnectedHosts / this.hostCount) * 100;
    });

  constructor(private hostInfoService: HostInfoService) {}

  ngOnDestroy() {
    this.alive = false;
  }
}
