import { Component, AfterViewInit, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { ContainerInfoService } from "app/@core/mock/container-info.service";

@Component({
  selector: "ngx-container-info",
  templateUrl: "./container-info.component.html",
  styleUrls: ["./container-info.component.scss"],
})
export class ContainerInfoComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;


  constructor(
    private theme: NbThemeService,
    private containerInfoService: ContainerInfoService
  ) {}

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.containerInfoService
        .getContainerInfoData()
        .subscribe((containerInfo) => {
          let containers = this.extract(containerInfo);
          this.options = {
            backgroundColor: echarts.bg,
            color: [
              colors.warningLight,
              colors.infoLight,
              colors.dangerLight,
              colors.successLight,
              colors.primaryLight,
            ],
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)",
            },
            legend: {
              orient: "vertical",
              left: "left",
              data: ["Running", "Restarting", "Exited", "Paused"],
              textStyle: {
                color: echarts.textColor,
              },
            },
            series: [
              {
                name: "Container Info",
                type: "pie",
                radius: "80%",
                center: ["50%", "50%"],
                data: [
                  { value: containers.paused, name: "Paused" },
                  { value: containers.exited, name: "Exited" },
                  { value: containers.restarting, name: "Restarting" },
                  { value: containers.running, name: "Running" },
                ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: echarts.itemHoverShadowColor,
                  },
                },
                label: {
                  normal: {
                    textStyle: {
                      color: echarts.textColor,
                    },
                  },
                },
                labelLine: {
                  normal: {
                    lineStyle: {
                      color: echarts.axisLineColor,
                    },
                  },
                },
              },
            ],
          };
        });
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private extract(containerInfo): any {
    let containersRunning = [];
    let containersRestarting = [];
    let containersExited = [];
    let containersPaused = [];

    containerInfo.forEach((container) => {
      container.status === "running"
        ? containersRunning.push(container.id)
        : container.status === "restarting"
        ? containersRestarting.push(container.id)
        : container.status === "exited"
        ? containersExited.push(container.id)
        : containersPaused.push(container.id);
    });

    let running: number = containersRunning.length;
    let restarting: number = containersRestarting.length;
    let exited: number = containersExited.length;
    let paused: number = containersPaused.length;

    return { running, restarting, exited, paused };
  }
}
