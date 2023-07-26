import { Observable } from "rxjs";

export interface ContainerInfo {
  name: string;
  status: string;
  id: string;
}

export abstract class ContainerInfoData {
  abstract getContainerInfoData(): Observable<ContainerInfo[]>;
}
