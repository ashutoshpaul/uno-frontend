export interface IMessage {
  name: string;
  content: string;
  time: string;
  isSentByMe?: boolean;
}