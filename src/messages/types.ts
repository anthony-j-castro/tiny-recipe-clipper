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
  sender: "web-app";
  type: "PING";
};

export type RecipeImporterReadyMessage = BaseMessage & {
  sender: "web-app";
  type: "RECIPE_IMPORTER_READY";
};

export type SendRecipeDataMessage = BaseMessage & {
  sender: "popup";
  type: "SEND_RECIPE_DATA";
};

export type RecipeDataMessage = BaseMessage & {
  sender: "service-worker";
  type: "RECIPE_DATA";
};

export type Message =
  | PingMessage
  | RecipeDataMessage
  | RecipeImporterReadyMessage
  | SendRecipeDataMessage;

export type ReceivableServiceWorkerMessage =
  | PingMessage
  | RecipeImporterReadyMessage
  | SendRecipeDataMessage;
