import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { NbAuthJWTToken, NbAuthModule, NbDummyAuthStrategy, NbPasswordAuthStrategy} from "@nebular/auth";
import { NbSecurityModule, NbRoleProvider } from "@nebular/security";
import { of as observableOf } from "rxjs";
import { HostInfoData } from "./data/host-info";

import { throwIfAlreadyLoaded } from "./module-import-guard";
import { AnalyticsService, SeoService } from "./utils";
import { UserData } from "./data/users";
import { UserService } from "./mock/users.service";
import { MockDataModule } from "./mock/mock-data.module";
import { HostInfoService } from "./mock/host-info.service";
import { LayoutService } from "./utils/layout.service";
import { ResourcesChartData } from "./data/resources-chart";
import { ResourcesChartService } from "./mock/resources-chart.service";
import { ContainerInfoData } from "./data/container-info";
import { ContainerInfoService } from "./mock/container-info.service";
import { PodInfoData } from "./data/pod-info";
import { PodInfoService } from "./mock/pod-info.service";
import { WhatsappMessageData } from "./data/whatsapp-message";
import { WhatsappMessageService } from "./mock/whatsapp-message.service";
import { EventLogData } from "./data/event-log";
import { EventLogService } from "./mock/event-log.service";

const socialLinks = [
  {
    url: "https://github.com/DanielNguh",
    target: "_blank",
    icon: "github",
  },
  {
    url: "https://web.facebook.com/nguh.daniel.39",
    target: "_blank",
    icon: "facebook",
  },
  {
    url: "https://twitter.com/DanielNguh",
    target: "_blank",
    icon: "twitter",
  },
];

const DATA_SERVICES = [
  { provide: UserData, useClass: UserService },
  { provide: HostInfoData, useClass: HostInfoService },
  { provide: ResourcesChartData, useClass: ResourcesChartService },
  { provide: ContainerInfoData, useClass: ContainerInfoService },
  { provide: PodInfoData, useClass: PodInfoService },
  { provide: WhatsappMessageData, useClass: WhatsappMessageService },
  { provide: EventLogData, useClass: EventLogService },
];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf("guest");
  }
}

export const NB_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers,
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({
    strategies: [
      NbPasswordAuthStrategy.setup({
        name: "email",
        token: {
          class: NbAuthJWTToken,
          key: 'token',
        },
        baseEndpoint: '',
          login: {
            endpoint: '/api/users/login',
            method: 'post',
          },
          register: {
            endpoint: '/api/users/signup',
            method: 'post',
          },
          logout: {
            endpoint: '/api/users/logout',
            method: 'get',
          },
          requestPass: {
            endpoint: '/api/users/request-pass',
            method: 'post',
          },
          resetPass: {
            endpoint: '/api/users/reset-pass',
            method: 'post',
          }
      }),
    ],
    forms: {
      login: {
        socialLinks: socialLinks,
      },
      register: {
        socialLinks: socialLinks,
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: "*",
      },
      user: {
        parent: "guest",
        create: "*",
        edit: "*",
        remove: "*",
      },
    },
  }).providers,

  {
    provide: NbRoleProvider,
    useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
  SeoService,
];

@NgModule({
  imports: [CommonModule],
  exports: [NbAuthModule],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, "CoreModule");
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...NB_CORE_PROVIDERS],
    };
  }
}
