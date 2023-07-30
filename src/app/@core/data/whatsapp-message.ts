import { Observable } from "rxjs";

export interface WhatsappMessage {
  receiver: number;
  template: string;
  direction: string;
  status: string;
  body: string;
  createdAt: Date;
  messageId: string;
}

export abstract class WhatsappMessageData {
  abstract getWhatsappMessageData(): Observable<WhatsappMessage[]>;
}
