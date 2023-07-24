import {
  Component,
  OnDestroy,
  AfterViewInit,
  Input,
  OnChanges,
  OnInit,
} from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { ResourcesChartService } from "app/@core/mock/resources-chart.service";
import { delay, takeWhile } from "rxjs/operators";
import LinearGradient from "zrender/lib/graphic/LinearGradient";

@Component({
  selector: "ngx-resources-chart",
  styleUrls: ["./charts-panel.component.scss"],
  templateUrl: "./charts-panel.component.html",
})
export class ChartsPanelComponent
  implements OnDestroy, AfterViewInit, OnInit, OnChanges
{
  resourcesChartData: any;

  private alive = true;

  echartsInstance: any;
  options: any = {};
  option: any = {};
  themeSubscription: any;

  ramData: number[] = [];
  ramTime: string[] = [];

  cpuData: number[] = [];
  cpuTime: string[] = [];

  diskData: number[] = [];
  diskTime: string[] = [];

  isAlive: Boolean;

  constructor(
    private theme: NbThemeService,
    private resourceChartService: ResourcesChartService
  ) {}

  ngOnChanges(): void {}

  ngOnInit(): void {
    this.theme
      .getJsTheme()
      .pipe(
        delay(1),
        takeWhile(() => this.alive)
      )
      .subscribe((config) => {
        const echarts: any = config.variables.echarts;

        this.ramData = [];
        this.cpuData = [];
        this.diskData = [];
        this.ramTime = []; // clear arrays

        this.resourceChartService
          .getResourcesChartData()
          .subscribe((systemResources) => {
            this.extract(systemResources);
            this.option = {
              grid: {
                left: 40,
                top: 20,
                right: 0,
                bottom: 40,
              },
              tooltip: {
                trigger: "item",
                axisPointer: {
                  type: "line",
                  lineStyle: {
                    color: echarts.tooltipLineColor,
                    width: echarts.tooltipLineWidth,
                  },
                },
                textStyle: {
                  color: echarts.tooltipTextColor,
                  fontSize: echarts.tooltipFontSize,
                  fontWeight: echarts.tooltipFontWeight,
                },
                position: "top",
                backgroundColor: echarts.tooltipBg,
                borderColor: echarts.tooltipBorderColor,
                borderWidth: 1,
                formatter: (params) => {
                  return Math.round(parseInt(params.value, 10));
                },
                extraCssText: echarts.tooltipExtraCss,
              },
              xAxis: {
                type: "category",
                boundaryGap: false,
                offset: 5,
                data: this.ramTime,
                axisTick: {
                  show: false,
                },
                axisLabel: {
                  color: echarts.axisTextColor,
                  fontSize: echarts.axisFontSize,
                },
                axisLine: {
                  lineStyle: {
                    color: echarts.axisLineColor,
                    width: "2",
                  },
                },
              },
              yAxis: {
                type: "value",
                boundaryGap: false,
                axisLine: {
                  lineStyle: {
                    color: echarts.axisLineColor,
                    width: "1",
                  },
                },
                axisLabel: {
                  color: echarts.axisTextColor,
                  fontSize: echarts.axisFontSize,
                },
                axisTick: {
                  show: false,
                },
                splitLine: {
                  lineStyle: {
                    color: echarts.yAxisSplitLine,
                    width: "1",
                  },
                },
              },
              series: [
                {
                  type: "line",
                  smooth: true,
                  symbolSize: 20,
                  itemStyle: {
                    normal: {
                      opacity: 0,
                    },
                    emphasis: {
                      opacity: 0,
                    },
                  },
                  lineStyle: {
                    normal: {
                      width: 0,
                    },
                  },
                  areaStyle: {
                    normal: {
                      color: new LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: "rgb(128, 255, 165)",
                        },
                        {
                          offset: 1,
                          color: "rgb(1, 191, 236)",
                        },
                      ]),
                      opacity: 1,
                    },
                  },
                  data: this.ramData,
                },
                {
                  type: "line",
                  smooth: true,
                  symbolSize: 20,
                  itemStyle: {
                    normal: {
                      opacity: 0,
                    },
                    emphasis: {
                      color: "#ffffff",
                      borderColor: echarts.itemBorderColor,
                      borderWidth: 2,
                      opacity: 1,
                    },
                  },
                  lineStyle: {
                    normal: {
                      width: echarts.lineWidth,
                      type: echarts.lineStyle,
                    },
                  },
                  areaStyle: {
                    normal: {
                      color: new LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: "rgb(0, 221, 255)",
                        },
                        {
                          offset: 1,
                          color: "rgb(77, 119, 255)",
                        },
                      ]),
                    },
                  },
                  data: this.cpuData,
                },
                {
                  type: "line",
                  smooth: true,
                  symbolSize: 20,
                  itemStyle: {
                    normal: {
                      opacity: 0,
                    },
                    emphasis: {
                      color: "#ffffff",
                      borderColor: echarts.itemBorderColor,
                      borderWidth: 2,
                      opacity: 1,
                    },
                  },
                  lineStyle: {
                    normal: {
                      width: echarts.lineWidth,
                      type: echarts.lineStyle,
                    },
                  },
                  areaStyle: {
                    normal: {
                      color: new LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: "rgb(255, 0, 135)",
                        },
                        {
                          offset: 1,
                          color: "rgb(135, 0, 157)",
                        },
                      ]),
                    },
                  },
                  data: this.diskData,
                },
              ],
            };
          });
      });
  }

  ngAfterViewInit() {
    // this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
    //   const echarts: any = config.variables.echarts;
    // });
  }

  onChartInit(echarts) {
    this.echartsInstance = echarts;
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
    this.alive = false;
  }

  public extract(systemResources) {
    systemResources.forEach((resource) => {
      resource.resource === "RAM"
        ? this.ramData.push(resource.value)
        : resource.resource === "CPU"
        ? this.cpuData.push(resource.value)
        : this.diskData.push(resource.value);
    });

    systemResources.forEach((resource) => {
      resource.resource == "RAM"
        ? this.ramTime.push(resource.createdAt)
        : resource.resource == "CPU"
        ? this.cpuTime.push(resource.createdAt)
        : this.diskTime.push(resource.createdAt);
    });
  }
}
