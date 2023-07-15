import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './users.service';
import { HostInfoService } from './host-info.service';
import { ResourcesChartService } from './resources-chart.service';
import { ChartsPanelService } from './chart-panel.service';

const SERVICES = [
  UserService,
  HostInfoService,
  ResourcesChartService,
  ChartsPanelService
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class MockDataModule {
  static forRoot(): ModuleWithProviders<MockDataModule> {
    return {
      ngModule: MockDataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
