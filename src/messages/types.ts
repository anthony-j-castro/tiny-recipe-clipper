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
  payload: {
    recipe: { title: string; url: string };
  };
  sender: "recipe-scraper";
  type: "SEND_RECIPE_DATA";
};

export type ExtractRecipeMessage = BaseMessage & {
  payload: {
    destination: "popup" | "service-worker";
  };
  sender: "popup";
  type: "EXTRACT_RECIPE";
};

export type RecipeDataMessage = BaseMessage & {
  payload: {
    recipe: { title: string; url: string };
  };
  sender: "recipe-scraper" | "service-worker";
  type: "RECIPE_DATA";
};

export type ErrorMessage = BaseMessage & {
  payload: {
    error: string;
  };
  type: "ERROR";
};

export type Message =
  | ErrorMessage
  | ExtractRecipeMessage
  | PingMessage
  | RecipeDataMessage
  | RecipeImporterReadyMessage
  | SendRecipeDataMessage;

export type ReceivablePopupMessage = RecipeDataMessage;

export type ReceivableRecipeScraperMessage = ExtractRecipeMessage;

export type ReceivableServiceWorkerMessage =
  | PingMessage
  | RecipeDataMessage
  | RecipeImporterReadyMessage
  | SendRecipeDataMessage;
