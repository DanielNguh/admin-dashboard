import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbListModule,
  NbProgressBarModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { HostInfoComponent } from './host-info/host-info.component';
import { ChartsPanelComponent } from './charts-panel/charts-panel.component';
import { ContainerInfoComponent } from './container-info/container-info.component';
import { PodInfoComponent } from './pod-info/pod-info.component';
import { WhatsappComponent } from './whatsapp/whatsapp.component';
import { WhatsappAnalyticsComponent } from './whatsapp/whatsapp-analytics/whatsapp-analytics.component';
import { WhatsappStatsComponent } from './whatsapp/whatsapp-stats/whatsapp-stats.component';
import { SlideOutComponent } from './slide-out/slide-out.component';
import { EventLogComponent } from './event-log/event-log.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbProgressBarModule,
    ChartModule,
    NgxEchartsModule,
    NgxChartsModule,
    NbIconModule,
    NbListModule,
    NbSelectModule,
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    HostInfoComponent,
    ChartsPanelComponent,
    ContainerInfoComponent,
    PodInfoComponent,
    WhatsappComponent,
    WhatsappAnalyticsComponent,
    WhatsappStatsComponent,
    SlideOutComponent,
    EventLogComponent,
  ],
})
export class DashboardModule {}
