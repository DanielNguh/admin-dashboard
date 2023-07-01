import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { delay, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-whatsapp-stats',
  templateUrl: './whatsapp-stats.component.html',
  styleUrls: ['./whatsapp-stats.component.scss'],
})
export class WhatsappStatsComponent implements AfterViewInit, OnDestroy {

  private alive = true;
  option: any = {};
  themeSubscription: any;
  value: number = 20;

  constructor(private theme: NbThemeService) { }


  ngAfterViewInit(): void {
    this.theme.getJsTheme()
      .pipe(
        takeWhile(() => this.alive),
        delay(1),
      )
      .subscribe(config => {
        const variables: any = config.variables;

        const echarts: any = config.variables.echarts;

        this.option = {
          color: [
            variables.warningLight,
            variables.infoLight,
            variables.dangerLight,
            variables.successLight,
            variables.primaryLight,
          ],
          tooltip: {
            trigger: 'item',
          },
          legend: {
            top: 'bottom',
            orient: 'horizontal',
            left: 'left',
            data: ['Sent', 'Received'],
            textStyle: {
              color: echarts.textColor,
            },
            },
          series: [
            {
              name: ' ',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
              },
              label: {
                show: false,
                position: 'center',
              },
              emphasis: {
                label: {
                  show: false,
                  fontSize: 40,
                  fontWeight: 'bold',
                },
              },
              labelLine: {
                show: false,
              },
              data: [
                { value: 20, name: 'Sent' },
                { value: 80, name: 'Received' },
              ],
            },
          ],

        };


    });

  }



  ngOnDestroy(): void {
    this.alive = false;
    // this.themeSubscription.unsubscribe();
  }
}
