import {
  Decoder,
  constant,
  either,
  exact,
  nonEmptyString,
  nullable,
  oneOf,
  uuidv4,
} from "decoders";
import {
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
  sender: constant("popup"),
  type: constant("SEND_RECIPE_DATA"),
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
      title: nullable(nonEmptyString),
      url: nonEmptyString,
    }),
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
