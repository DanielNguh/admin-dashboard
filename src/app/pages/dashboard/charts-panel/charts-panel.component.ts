import {
  Component,
  OnDestroy,
  AfterViewInit,
  Input,
  OnChanges,
} from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { SystemResourceChart } from "app/@core/data/resources-chart";
import LinearGradient from "zrender/lib/graphic/LinearGradient";

@Component({
  selector: "ngx-resources-chart",
  styleUrls: ["./charts-panel.component.scss"],
  templateUrl: "./charts-panel.component.html",
})
export class ChartsPanelComponent
  implements OnDestroy, AfterViewInit, OnChanges
{
  @Input() resourcesChartData: SystemResourceChart;

  private alive = true;

  echartsInstance: any;
  options: any = {};
  themeSubscription: any;
  ramData: number[] = [];
  timeStamps: any = [];

  constructor(
    private theme: NbThemeService,
  ) {}

  ngOnChanges(): void {}
  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
      const echarts: any = config.variables.echarts;
      this.setOptions(echarts);
      this.updateResourcesChartOptions(this.resourcesChartData);
    });
  }


  setOptions(echarts) {
    this.options = {
      grid: {
        left: 40,
        top: 20,
        right: 0,
        bottom: 40,
      },
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'line',
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
        position: 'top',
        backgroundColor: echarts.tooltipBg,
        borderColor: echarts.tooltipBorderColor,
        borderWidth: 1,
        formatter: (params) => {
          return Math.round(parseInt(params.value, 10));
        },
        extraCssText: echarts.tooltipExtraCss,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        offset: 5,
        data: [],
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
            width: '2',
          },
        },
      },
      yAxis: {
        type: 'value',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: echarts.axisLineColor,
            width: '1',
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
            width: '1',
          },
        },
      },
      series: [
        this.getFirstLine(echarts),
        this.getSecondLine(echarts),
        this.getThirdLine(echarts),
      ],
    };
  }

  getFirstLine(echarts) {
    return {
      type: 'line',
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
          color: new LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "rgb(128, 255, 165)",
          }, {
            offset: 1,
            color: "rgb(1, 191, 236)",
          }]),
          opacity: 1,
        },
      },
      data: [],
    };
  }

  getSecondLine(echarts) {
    return         {
      type: 'line',
      smooth: true,
      symbolSize: 20,
      itemStyle: {
        normal: {
          opacity: 0,
        },
        emphasis: {
          color: '#ffffff',
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
          color: new LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "rgb(0, 221, 255)",
          }, {
            offset: 1,
            color: "rgb(77, 119, 255)",
          }]),
        },
      },
      data: [],
    };
  }

  getThirdLine(echarts) {
    return {
      type: 'line',
      smooth: true,
      symbolSize: 20,
      itemStyle: {
        normal: {
          opacity: 0,
        },
        emphasis: {
          color: '#ffffff',
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
          color: new LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "rgb(255, 0, 135)",
          }, {
            offset: 1,
            color: "rgb(135, 0, 157)",
          }]),
        },
      },
      data: [],
    };
  }

  updateResourcesChartOptions(resourcesChartData: SystemResourceChart) {
    const options = this.options;
    const series = this.getNewSeries(options.series, resourcesChartData.linesData);
    const xAxis = this.getNewXAxis(options.xAxis, resourcesChartData.chartLabel);

    this.options = {
      ...options,
      xAxis,
      series,
    };
  }

  getNewSeries(series, linesData: number[][]) {
    return series.map((line, index) => {
      return {
        ...line,
        data: linesData[index],
      };
    });
  }

  getNewXAxis(xAxis, chartLabel: string[]) {
    return {
      ...xAxis,
      data: chartLabel,
    };
  }

  onChartInit(echarts) {
    this.echartsInstance = echarts;
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
    this.alive = false;
  }

}
