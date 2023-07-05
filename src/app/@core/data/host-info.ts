import { Observable } from 'rxjs';

export interface HostInfo {
  title?: string;
  value?: number;
  activeProgress?: number;
  description?: string;
  ip?: string;
  connected?: boolean;
}

export abstract class HostInfoData {
  abstract getHostInfo(): Observable<HostInfo[]>;
}
