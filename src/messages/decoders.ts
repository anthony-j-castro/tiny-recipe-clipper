import {
  constant,
  either,
  exact,
  nonEmptyString,
  nullable,
  oneOf,
  string,
  uuidv4,
  type Decoder,
} from "decoders";
import type {
  ErrorMessage,
  ExtractRecipeMessage,
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

const recipeDecoder: Decoder<Recipe> = exact({
  attribution: nullable(string),
  time: nullable(string),
  title: string,
  url: string,
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

export const errorMessageDecoder: Decoder<ErrorMessage> = exact({
  sender: constant("recipe-scraper"),
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
    pingMessageDecoder,
    recipeImporterReadyMessageDecoder,
    sendRecipeDataMessageDecoder,
    setUserIdForE2ETestDecoder,
  );
