import {
  array,
  constant,
  either,
  exact,
  nonEmptyString,
  nullable,
  oneOf,
  optional,
  record,
  string,
  unknown,
  uuidv4,
  type Decoder,
} from "decoders";
import type {
  ErrorMessage,
  ExtractRecipeMessage,
  LogInfoMessage,
  MessageSender,
  OpenUrlForE2ETestMessage,
  PingMessage,
  ReceivableRecipeScraperMessage,
  ReceivableServiceWorkerMessage,
  RecipeDataMessage,
  RecipeImporterReadyMessage,
  SendRecipeDataMessage,
  SetUserIdForE2ETestMessage,
} from "~/messages/types";
import { Recipe } from "~/types";

const senderDecoder: Decoder<MessageSender> = oneOf([
  "e2e-test",
  "options",
  "popup",
  "recipe-scraper",
  "service-worker",
  "web-app",
]);

const recipeDecoder: Decoder<Recipe> = exact({
  attribution: nullable(string),
  image: nullable(string),
  ingredientGroups: array(
    exact({
      name: optional(string),
      ingredients: array(string),
    }),
  ),
  time: nullable(string),
  title: string,
  url: string,
  yield: nullable(string),
});

export const setUserIdForE2ETestDecoder: Decoder<SetUserIdForE2ETestMessage> =
  exact({
    sender: constant("web-app"),
    type: constant("SET_USER_ID_FOR_E2E_TEST"),
    payload: exact({
      userId: uuidv4,
    }),
  });

export const openUrlForE2ETestDecoder: Decoder<OpenUrlForE2ETestMessage> =
  exact({
    sender: constant("web-app"),
    type: constant("OPEN_URL_FOR_E2E_TEST"),
    payload: exact({
      url: string,
    }),
  });

const pingMessageDecoder: Decoder<PingMessage> = exact({
  sender: constant("web-app"),
  type: constant("PING"),
  payload: exact({
    userId: uuidv4,
  }),
});

export const recipeImporterReadyMessageDecoder: Decoder<RecipeImporterReadyMessage> =
  exact({
    sender: constant("web-app"),
    type: constant("RECIPE_IMPORTER_READY"),
  });

const sendRecipeDataMessageDecoder: Decoder<SendRecipeDataMessage> = exact({
  sender: constant("recipe-scraper"),
  type: constant("SEND_RECIPE_DATA"),
  payload: exact({
    recipe: recipeDecoder,
  }),
});

const extractRecipeMessageDecoder: Decoder<ExtractRecipeMessage> = exact({
  sender: constant("popup"),
  type: constant("EXTRACT_RECIPE"),
  payload: exact({
    destination: oneOf(["popup", "service-worker"]),
  }),
});

export const recipeDataMessageDecoder: Decoder<RecipeDataMessage> = exact({
  sender: constant("recipe-scraper"),
  type: constant("RECIPE_DATA"),
  payload: exact({
    recipe: recipeDecoder,
  }),
});

export const logInfoMessageDecoder: Decoder<LogInfoMessage> = exact({
  sender: senderDecoder,
  type: constant("LOG_INFO"),
  payload: exact({
    message: nonEmptyString,
    properties: optional(record(unknown)),
  }),
});

export const errorMessageDecoder: Decoder<ErrorMessage> = exact({
  sender: senderDecoder,
  type: constant("ERROR"),
  payload: exact({
    error: nonEmptyString,
  }),
});

export const receivableRecipeScraperMessageDecoder: Decoder<ReceivableRecipeScraperMessage> =
  either(extractRecipeMessageDecoder);

export const receivableServiceWorkerMessageDecoder: Decoder<ReceivableServiceWorkerMessage> =
  either(
    openUrlForE2ETestDecoder,
    logInfoMessageDecoder,
    pingMessageDecoder,
    recipeImporterReadyMessageDecoder,
    sendRecipeDataMessageDecoder,
    setUserIdForE2ETestDecoder,
  );
