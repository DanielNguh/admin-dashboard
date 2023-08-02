import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EventLog, EventLogData } from "../data/event-log";

@Injectable({
  providedIn: "root",
})

export class EventLogService extends EventLogData {
  constructor(private http: HttpClient) {
    super();
  }

  getEventLogData(): Observable<EventLog[]> {
    return this.http.get<EventLog[]>("/api/logs");
  }
}
