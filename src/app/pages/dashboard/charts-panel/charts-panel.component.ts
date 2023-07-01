import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';

// import { OrdersChart } from '../../../@core/data/resources-chart';

@Component({
  selector: 'ngx-resources-chart',
  styleUrls: ['./charts-panel.component.scss'],
  templateUrl: './charts-panel.component.html',
})
export class ChartsPanelComponent implements OnDestroy, AfterViewInit {
  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {}

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        // backgroundColor: echarts.bg,
        // color: [colors.danger, colors.primary, colors.info],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}',
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
          extraCssText: echarts.tooltipExtraCss,
        },
        legend: {
          left: 'left',
          data: ['RAM', 'CPU', 'Disk'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        xAxis: [
          {
            type: 'category',
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
            offset: 5,
            boundaryGap: false,
            axisTick: {
              // alignWithLabel: true,
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
                width: '2',
              },
            },
            axisLabel: {
              color: echarts.axisTextColor,
              fontSize: echarts.axisFontSize,
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
                width: '1',
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
                width: '1',
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        series: [
          {
            name: 'RAM',
            type: 'line',
            smooth: true,
            data: [20, 26, 30, 29, 15, 80, 85, 83, 72],
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
                width: 1,
              },
            },
            areaStyle: {
              normal: {
                color: echarts.firstAreaGradTo,
                opacity: 0.6,
              },
            },
          },
          {
            name: 'CPU',
            type: 'line',
            smooth: true,
            data: [1, 2, 4, 8, 16, 32, 64, 128, 256],
          },
          {
            name: 'Disk',
            type: 'line',
            smooth: true,
            data: [
              50,
              68,
              72,
              23,
              46,
              87,
              73,
              64,
              90,
            ],
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
