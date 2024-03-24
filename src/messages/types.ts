export type MessageSender =
  | "options"
  | "popup"
  | "recipe-scraper"
  | "service-worker"
  | "web-app";

export type BaseMessage = {
  sender: MessageSender;
  type: string;
  payload?: unknown;
};

export type PingMessage = BaseMessage & {
  payload: {
    userId: string;
  };
  type: "PING";
};

export type Message = PingMessage;

export type ReceivableServiceWorkerMessage = PingMessage;
