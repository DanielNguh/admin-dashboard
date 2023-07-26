import { Observable } from "rxjs";

export interface PodInfo {
  name: string;
  status: string;
  namespace: string;
}

export abstract class PodInfoData {
  abstract getPodInfoData(): Observable<PodInfo[]>;
}
