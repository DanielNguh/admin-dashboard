import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { delay, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-whatsapp-analytics',
  templateUrl: './whatsapp-analytics.component.html',
  styleUrls: ['./whatsapp-analytics.component.scss'],
})
export class WhatsappAnalyticsComponent implements AfterViewInit, OnDestroy {
  private alive = true;
  option: any;
  themeSubscription: any;
  echartsInstance: any;

  constructor(private theme: NbThemeService) {}

  ngAfterViewInit(): void {
    this.theme
      .getJsTheme()
      .pipe(
        delay(1),
        takeWhile(() => this.alive),
      )
      .subscribe((config) => {
        const echarts: any = config.variables.echarts;

        this.option = {
          grid: {
            left: 20,
            top: 50,
            right: 0,
            bottom: 20,
            containLabel: true,
          },
          tooltip: {
            trigger: 'item',
            formatter: '{c}',
            axisPointer: {
              type: 'line',
              lineStyle: {
                color: echarts.tooltipLineColor,
                width: echarts.tooltipLineWidth,
              },
            },
            textStyle: {
              color: echarts.tooltipTextColor,
              fontSize: 20,
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
            data: ['Sent', 'Received'],
            textStyle: {
              color: echarts.textColor,
            },
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            offset: 10,
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
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
            {
              name: 'Sent',
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
              // lineStyle: {
              //   normal: {
              //     width: echarts.lineWidth,
              //     type: echarts.lineStyle,
              //     shadowColor: echarts.lineShadow,
              //     shadowBlur: 6,
              //     shadowOffsetY: 12,
              //   },
              // },
              lineStyle: {
                normal: {
                  width: echarts.lineWidth,
                  type: echarts.lineStyle,
                  shadowColor: echarts.lineShadow,
                  shadowBlur: 6,
                  shadowOffsetY: 12,
                },
              },

              areaStyle: {
                normal: {},
              },
              data: [20, 98, 130, 29, 15, 80, 85, 83, 72],
            },
            {
              name: 'Received',
              type: 'line',
              smooth: true,
              symbolSize: 20,
              tooltip: {
                show: true,
                extraCssText: '',
              },
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
                  width: echarts.innerLineWidth,
                  type: echarts.innerLineStyle,
                },
              },
              areaStyle: {
                normal: {
                  opacity: 0.9,
                },
              },
              data: [50, 2, 70, 8, 16, 32, 64, 128, 256],
            },
          ],
        };
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
