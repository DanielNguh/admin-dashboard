import { Inject, Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { HostInfo, HostInfoData } from '../data/host-info';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HostInfoService extends HostInfoData {
  private hostInfoData: HostInfo[] = [
    {
      title: 'Total Hosts',
      value: 6,
      activeProgress: 100,
      description: 'Better than last week (70%)',
    },
    {
      title: 'Connected Hosts',
      value: 4,
      activeProgress: 30,
      description: 'Better than last week (30%)',
    },
    {
      title: 'Disconnected Hosts',
      value: 2,
      activeProgress: 70,
      description: 'Better than last week (55%)',
    },
  ];

  getHosts$ = this.http.get<HostInfo[]>('/api/rooms').pipe(shareReplay(1));
  constructor(private http: HttpClient) {
    super();
  }
  getHostInfoData(): Observable<HostInfo[]> {
    return observableOf(this.hostInfoData);
  }

  public getHostInfo() {
    return this.http.get<HostInfo[]>('/api/hosts');
  }
}
