import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { WhatsappMessage, WhatsappMessageData } from "../data/whatsapp-message";

@Injectable({
  providedIn: "root",
})
export class WhatsappMessageService extends  WhatsappMessageData{
  constructor(private http: HttpClient) {
    super();
  }


  getWhatsappMessageData(): Observable<WhatsappMessage[]> {
    return this.http.get<WhatsappMessage[]>("/api/whatsapp");
  }
}
