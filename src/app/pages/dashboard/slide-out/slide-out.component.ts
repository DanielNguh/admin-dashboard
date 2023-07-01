import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-slide-out',
  templateUrl: './slide-out.component.html',
  styleUrls: ['./slide-out.component.scss'],
})
export class SlideOutComponent  {

  @Input() showWhatsappStatistics: boolean = false;
  constructor() { }

  toggleStatistics() {
    this.showWhatsappStatistics = !this.showWhatsappStatistics;
  }
}
