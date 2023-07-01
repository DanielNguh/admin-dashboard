import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-logs',
  templateUrl: './event-log.component.html',
  styleUrls: ['./event-log.component.scss'],
})
export class EventLogComponent implements OnDestroy {
  private alive = true;

  eventLogs = [
    { date: new Date(), severity: 'High',   type: 'Hard disk failure' },
    { date: new Date(), severity: 'Low',    type: 'Container Stopped' },
    { date: new Date(), severity: 'Medium', type: 'K8s Pod Stopped' },
    { date: new Date(), severity: 'High',   type: 'Out of Memory' },
    { date: new Date(), severity: 'High',   type: 'Security Breach' },
    { date: new Date(), severity: 'High',   type: 'Firewall inactive' },
    { date: new Date(), severity: 'High',   type: 'Docker machine exit' },
    { date: new Date(), severity: 'Medium', type: 'Certificate expiry' },

  ];
  type = 'month';
  types = ['week', 'month', 'year'];
  currentTheme: string;

  constructor(private themeService: NbThemeService) {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe((theme) => {
        this.currentTheme = theme.name;
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
