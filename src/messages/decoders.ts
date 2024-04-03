import {
  Decoder,
  constant,
  either,
  exact,
  nonEmptyString,
  oneOf,
  uuidv4,
} from "decoders";
import {
  ErrorMessage,
  ExtractRecipeMessage,
  PingMessage,
  ReceivableRecipeScraperMessage,
  ReceivableServiceWorkerMessage,
  RecipeDataMessage,
  RecipeImporterReadyMessage,
  SendRecipeDataMessage,
} from "~/messages/types";

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
    pingMessageDecoder,
    recipeImporterReadyMessageDecoder,
    sendRecipeDataMessageDecoder,
  );
