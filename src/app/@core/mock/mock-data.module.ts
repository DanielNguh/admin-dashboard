import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './users.service';
import { HostInfoService } from './host-info.service';
import { ResourcesChartService } from './resources-chart.service';
import { ContainerInfoService } from './container-info.service';
import { PodInfoService } from './pod-info.service';

const SERVICES = [
  UserService,
  HostInfoService,
  ResourcesChartService,
  ContainerInfoService,
  PodInfoService
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
