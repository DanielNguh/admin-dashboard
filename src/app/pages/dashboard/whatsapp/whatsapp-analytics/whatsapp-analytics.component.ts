import { Component, AfterViewInit, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { WhatsappMessage } from "app/@core/data/whatsapp-message";
import { WhatsappMessageService } from "app/@core/mock/whatsapp-message.service";
import { delay, takeWhile } from "rxjs/operators";

@Component({
  selector: "ngx-whatsapp-analytics",
  templateUrl: "./whatsapp-analytics.component.html",
  styleUrls: ["./whatsapp-analytics.component.scss"],
})
export class WhatsappAnalyticsComponent implements AfterViewInit, OnDestroy {
  private alive = true;
  option: any;
  themeSubscription: any;
  echartsInstance: any;

  constructor(
    private theme: NbThemeService,
    private whatsappMessageService: WhatsappMessageService
  ) {}

  ngAfterViewInit(): void {
    this.theme
      .getJsTheme()
      .pipe(
        delay(1),
        takeWhile(() => this.alive)
      )
      .subscribe((config) => {
        const echarts: any = config.variables.echarts;

        this.whatsappMessageService
          .getWhatsappMessageData()
          .subscribe((whatsappMessages) => {
            let messages = this.extract(whatsappMessages);
            let sent: any[] = messages.messagesSent;
            let received: any[] = messages.messagesReceived;

            let sentDays = this.extractToDays(sent);
            let receivedDays = this.extractToDays(received);

            this.option = {
              grid: {
                left: 20,
                top: 50,
                right: 0,
                bottom: 20,
                containLabel: true,
              },
              tooltip: {
                trigger: "item",
                formatter: "{c}",
                axisPointer: {
                  type: "line",
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
                position: "top",
                backgroundColor: echarts.tooltipBg,
                borderColor: echarts.tooltipBorderColor,
                borderWidth: 1,
                extraCssText: echarts.tooltipExtraCss,
              },
              legend: {
                left: "left",
                data: ["Sent", "Received"],
                textStyle: {
                  color: echarts.textColor,
                },
              },
              xAxis: {
                type: "category",
                boundaryGap: false,
                offset: 10,
                data: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
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
                  name: "Sent",
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
                      shadowColor: echarts.lineShadow,
                      shadowBlur: 6,
                      shadowOffsetY: 12,
                    },
                  },

                  areaStyle: {
                    normal: {},
                  },
                  data: [
                    sentDays.lenSunday,
                    sentDays.lenMonday,
                    sentDays.lenTuesday,
                    sentDays.lenWednesday,
                    sentDays.lenThursday,
                    sentDays.lenFriday,
                    sentDays.lenSaturday,
                  ],
                },
                {
                  name: "Received",
                  type: "line",
                  smooth: true,
                  symbolSize: 20,
                  tooltip: {
                    show: true,
                    extraCssText: "",
                  },
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
                      width: echarts.innerLineWidth,
                      type: echarts.innerLineStyle,
                    },
                  },
                  areaStyle: {
                    normal: {
                      opacity: 0.9,
                    },
                  },
                  data: [
                    receivedDays.lenSunday,
                    receivedDays.lenMonday,
                    receivedDays.lenTuesday,
                    receivedDays.lenWednesday,
                    receivedDays.lenThursday,
                    receivedDays.lenFriday,
                    receivedDays.lenSaturday,
                  ],
                },
              ],
            };
          });
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private extract(messages): any {
    let messagesSent = [];
    let messagesReceived = [];
    let messagesFailed = [];

    messages.forEach((message) => {
      message.status === "sent"
        ? messagesSent.push(message.messageId)
        : message.status === "received"
        ? messagesReceived.push(message.messageId)
        : messagesFailed.push(message.messageId);
    });

    return { messagesSent, messagesReceived };
  }

  private extractToDays(messages): any {
    let sunday = [];
    let monday = [];
    let tuesday = [];
    let wednesday = [];
    let thursday = [];
    let friday = [];
    let saturday = [];
    let day: number;

    messages.forEach((message: WhatsappMessage) => {
      day = new Date(message.createdAt).getUTCDay();

      day === 0
        ? sunday.push(message.messageId)
        : day === 1
        ? monday.push(message.messageId)
        : day === 2
        ? tuesday.push(message.messageId)
        : day === 3
        ? wednesday.push(message.messageId)
        : day === 4
        ? thursday.push(message.messageId)
        : day === 5
        ? friday.push(message.messageId)
        : saturday.push(message.messageId);
    });

    let lenSunday: number = sunday.length;
    let lenMonday: number = monday.length;
    let lenTuesday: number = tuesday.length;
    let lenWednesday: number = wednesday.length;
    let lenThursday: number = thursday.length;
    let lenFriday: number = friday.length;
    let lenSaturday: number = saturday.length;

    return {
      lenSunday,
      lenMonday,
      lenTuesday,
      lenWednesday,
      lenThursday,
      lenFriday,
      lenSaturday,
    };
  }
}
