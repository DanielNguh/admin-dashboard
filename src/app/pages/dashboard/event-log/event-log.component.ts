import { Component, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { EventLog } from "app/@core/data/event-log";
import { EventLogService } from "app/@core/mock/event-log.service";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: "ngx-logs",
  templateUrl: "./event-log.component.html",
  styleUrls: ["./event-log.component.scss"],
})
export class EventLogComponent implements OnDestroy {
  private alive = true;
  eventLogs$: EventLog[];

  type = "month";
  types = ["week", "month", "year"];
  currentTheme: string;

  constructor(
    private themeService: NbThemeService,
    private eventLogService: EventLogService
  ) {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe((theme) => {
        this.currentTheme = theme.name;
      });
    this.eventLogService.getEventLogData().subscribe((data) => {
      this.eventLogs$ = data;
    });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
