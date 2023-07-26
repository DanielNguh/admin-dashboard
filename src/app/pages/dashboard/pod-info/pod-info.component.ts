import { Component, AfterViewInit, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { PodInfoService } from "app/@core/mock/pod-info.service";

@Component({
  selector: "ngx-pod-info",
  templateUrl: "./pod-info.component.html",
  styleUrls: ["./pod-info.component.scss"],
})
export class PodInfoComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(
    private theme: NbThemeService,
    private podInfoService: PodInfoService
  ) {}

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.podInfoService.getPodInfoData().subscribe((podInfo) => {
        let pods = this.extract(podInfo);
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
            data: ["Running", "Restarting", "Exited"],
            textStyle: {
              color: echarts.textColor,
            },
          },
          series: [
            {
              name: "Pod Info",
              type: "pie",
              radius: "80%",
              center: ["50%", "50%"],
              data: [
                { value: pods.exited, name: "Exited" },
                { value: pods.restarting, name: "Restarting" },
                { value: pods.running, name: "Running" },
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

  private extract(podInfo): any {
    let podsRunning = [];
    let podsRestarting = [];
    let podsExited = [];

    podInfo.forEach((pod) => {
      pod.status === "running"
        ? podsRunning.push(pod.name)
        : pod.status === "restarting"
        ? podsRestarting.push(pod.name)
        : podsExited.push(pod.name);
    });

    let running: number = podsRunning.length;
    let restarting: number = podsRestarting.length;
    let exited: number = podsExited.length;

    return { running, restarting, exited };
  }
}
