import { Recipe } from "~/types";

export interface BaseMessage {
  sender: MessageSender;
  type: string;
  payload?: unknown;
}

export type ErrorMessage = BaseMessage & {
  payload: {
    error: string;
  };
  type: "ERROR";
};

export type ExtractRecipeMessage = BaseMessage & {
  payload: {
    destination: "popup" | "service-worker";
  };
  sender: "popup";
  type: "EXTRACT_RECIPE";
};

export type LogInfoMessage = BaseMessage & {
  payload: {
    message: string;
    properties?: Record<string, unknown>;
  };
  type: "LOG_INFO";
};

export type Message =
  | ErrorMessage
  | ExtractRecipeMessage
  | LogInfoMessage
  | OpenUrlForE2ETestFailureMessage
  | OpenUrlForE2ETestMessage
  | OpenUrlForE2ETestSuccessMessage
  | PingMessage
  | PongMessage
  | RecipeDataMessage
  | RecipeImporterReadyMessage
  | SendRecipeDataMessage
  | SetUserIdForE2ETestMessage
  | SetUserIdForE2ETestSuccessMessage;

export type MessageSender =
  | "e2e-test"
  | "options"
  | "popup"
  | "recipe-scraper"
  | "service-worker"
  | "web-app";

export type OpenUrlForE2ETestFailureMessage = BaseMessage & {
  sender: "service-worker";
  type: "OPEN_URL_FOR_E2E_TEST_FAILURE";
};

export type OpenUrlForE2ETestMessage = BaseMessage & {
  payload: {
    url: string;
  };
  sender: "web-app";
  type: "OPEN_URL_FOR_E2E_TEST";
};

export type OpenUrlForE2ETestSuccessMessage = BaseMessage & {
  payload: {
    tabId: number;
  };
  sender: "service-worker";
  type: "OPEN_URL_FOR_E2E_TEST_SUCCESS";
};

export type PingMessage = BaseMessage & {
  payload: {
    userId: string;
  };
  sender: "web-app";
  type: "PING";
};

export type PongMessage = BaseMessage & {
  payload: {
    extensionVersion: string;
  };
  sender: "service-worker";
  type: "PONG";
};

export type ReceivablePopupMessage = RecipeDataMessage;

export type ReceivableRecipeScraperMessage = ExtractRecipeMessage;

export type ReceivableServiceWorkerMessage =
  | LogInfoMessage
  | OpenUrlForE2ETestMessage
  | PingMessage
  | RecipeDataMessage
  | RecipeImporterReadyMessage
  | SendRecipeDataMessage
  | SetUserIdForE2ETestMessage;

export type RecipeDataMessage = BaseMessage & {
  payload: {
    recipe: Recipe;
  };
  sender: "recipe-scraper" | "service-worker";
  type: "RECIPE_DATA";
};

export type RecipeImporterReadyMessage = BaseMessage & {
  sender: "web-app";
  type: "RECIPE_IMPORTER_READY";
};

export type SendRecipeDataMessage = BaseMessage & {
  payload: {
    recipe: Recipe;
  };
  sender: "recipe-scraper";
  type: "SEND_RECIPE_DATA";
};

export type SendResponseFn = (response: Message) => void;

export type SetUserIdForE2ETestMessage = BaseMessage & {
  payload: {
    userId: string;
  };
  sender: "web-app";
  type: "SET_USER_ID_FOR_E2E_TEST";
};

export type SetUserIdForE2ETestSuccessMessage = BaseMessage & {
  sender: "service-worker";
  type: "SET_USER_ID_FOR_E2E_TEST_SUCCESS";
};
