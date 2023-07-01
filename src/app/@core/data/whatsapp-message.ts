export interface WhatsappMessage {
  receiverNumber: number;
  template: string;
  direction: string;
  status: string;
  body: string;
  timeStamp: Date;
  messageId: string;
}
