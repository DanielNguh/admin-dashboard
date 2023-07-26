import { AfterViewInit, Component, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { WhatsappMessageService } from "app/@core/mock/whatsapp-message.service";
import { delay, takeWhile } from "rxjs/operators";

@Component({
  selector: "ngx-whatsapp-stats",
  templateUrl: "./whatsapp-stats.component.html",
  styleUrls: ["./whatsapp-stats.component.scss"],
})
export class WhatsappStatsComponent implements AfterViewInit, OnDestroy {
  private alive = true;
  option: any = {};
  percentSent: number = 0;
  percentReceived: number = 0;

  failed: number = 0;
  sent: number = 0;
  received: number = 0;

  constructor(
    private theme: NbThemeService,
    private whatsappMessageService: WhatsappMessageService
  ) {}

  ngAfterViewInit(): void {
    this.theme
      .getJsTheme()
      .pipe(
        takeWhile(() => this.alive),
        delay(1)
      )
      .subscribe((config) => {
        const variables: any = config.variables;
        const echarts: any = config.variables.echarts;

        this.whatsappMessageService
          .getWhatsappMessageData()
          .subscribe((whatsappMessages) => {
            let messages = this.extract(whatsappMessages);
            this.sent = messages.totalSent;
            this.received = messages.totalReceived;
            this.percentSent =
              (messages.totalSent /
                (messages.totalSent + messages.totalReceived)) *
              100;
            this.percentReceived =
              (messages.totalReceived /
                (messages.totalSent + messages.totalReceived)) *
              100;
            this.failed = messages.totalFailed;

            this.option = {
              color: [
                variables.warningLight,
                variables.infoLight,
                variables.dangerLight,
                variables.successLight,
                variables.primaryLight,
              ],
              tooltip: {
                trigger: "item",
              },
              legend: {
                top: "bottom",
                itemGap: 80,
                orient: "horizontal",
                left: "left",
                data: ["Sent", "Received"],
                textStyle: {
                  color: echarts.textColor,
                },
              },
              series: [
                {
                  name: " ",
                  type: "pie",
                  radius: ["40%", "70%"],
                  avoidLabelOverlap: false,
                  itemStyle: {
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 2,
                  },
                  label: {
                    show: false,
                    position: "center",
                  },
                  emphasis: {
                    label: {
                      show: false,
                      fontSize: 40,
                      fontWeight: "bold",
                    },
                  },
                  labelLine: {
                    show: false,
                  },
                  data: [
                    { value: messages.totalSent, name: "Sent" },
                    { value: messages.totalReceived, name: "Received" },
                  ],
                },
              ],
            };
          });
      });
  }

  ngOnDestroy(): void {
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

    let totalSent: number = messagesSent.length;
    let totalReceived: number = messagesReceived.length;
    let totalFailed: number = messagesFailed.length;

    return { totalSent, totalReceived, totalFailed };
  }
}
