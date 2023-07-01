import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.scss'],
})
export class WhatsappComponent implements OnDestroy {
  private alive = true;
  chartLegend: { iconColor: string; title: string }[];

  constructor(private themeService: NbThemeService) {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe((config) => {});
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
