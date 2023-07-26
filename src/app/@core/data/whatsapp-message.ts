import { Observable } from "rxjs";

export interface WhatsappMessage {
  receiverNumber: number;
  template: string;
  direction: string;
  status: string;
  body: string;
  timeStamp: Date;
  messageId: string;
}

export abstract class WhatsappMessageData {
  abstract getWhatsappMessageData(): Observable<WhatsappMessage[]>;
}
