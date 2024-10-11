import {
  Decoder,
  constant,
  either,
  exact,
  nonEmptyString,
  oneOf,
  string,
  uuidv4,
} from "decoders";
import {
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
    recipe: exact({
      title: nonEmptyString,
      url: nonEmptyString,
    }),
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
    recipe: exact({
      title: nonEmptyString,
      url: nonEmptyString,
    }),
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
