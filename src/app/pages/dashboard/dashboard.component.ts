import { Component, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { ChartsPanelData } from "app/@core/data/charts-panel";
import { SystemResourceChart } from "app/@core/data/resources-chart";
import { takeWhile } from "rxjs/operators";

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: "ngx-dashboard",
  styleUrls: ["./dashboard.component.scss"],
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnDestroy {
  private alive = true;

  resourcesChartData: SystemResourceChart;

  shutdownCard: CardSettings = {
    title: "Shut Down",
    iconClass: "nb-power-circled",
    type: "danger",
  };
  restartShadesCard: CardSettings = {
    title: "Restart",
    iconClass: "nb-loop-circled",
    type: "success",
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.shutdownCard,
    this.restartShadesCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
    "material-dark": CardSettings[];
    "material-light": CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.shutdownCard,
        type: "warning",
      },
      {
        ...this.restartShadesCard,
        type: "primary",
      },
    ],
    dark: this.commonStatusCardsSet,
    "material-dark": this.commonStatusCardsSet,
    "material-light": this.commonStatusCardsSet,
  };

  constructor(
    private themeService: NbThemeService,
    private chartsPanelService: ChartsPanelData
  ) {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe((theme) => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });
    this.getResourcesData();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  getResourcesData() {
    this.chartsPanelService
      .getResourcesChartData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((resourcesChartData) => {
        this.resourcesChartData = resourcesChartData;
      });
  }
}
