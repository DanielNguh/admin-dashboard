import { Observable } from "rxjs";

export interface EventLog {
  id: string;
  type: string;
  errorMessage: string;
  timeStamp: Date;
  severity: string;
}

export abstract class EventLogData {
  abstract getEventLogData(): Observable<EventLog[]>;
}
