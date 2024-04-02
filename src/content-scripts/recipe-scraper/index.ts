import { receivableRecipeScraperMessageDecoder } from "~/messages/decoders";
import isRecipePage from "~/utils/isRecipePage";
import isSupportedWebsite from "~/utils/isSupportedWebsite";
import { Parser } from "./recipe-parsers";
import TimesParser from "./recipe-parsers/cooking.nytimes.com";

chrome.runtime.onMessage.addListener((rawMessage, sender, sendResponse) => {
  // We only care about messages from the extension. If a tab exists, that
  // means this message is from a content script.
  if (sender.tab) {
    return;
  }

  const message = receivableRecipeScraperMessageDecoder.value(rawMessage);

  switch (message?.type) {
    case "EXTRACT_RECIPE": {
      if (
        isSupportedWebsite(window.location.href) &&
        isRecipePage(window.location.href)
      ) {
        const { hostname } = new URL(window.location.href);

        const getAndSendRecipe = async (
          sendResponse: (response: unknown) => void,
        ) => {
          let parser: Parser;

          switch (hostname) {
            case "cooking.nytimes.com": {
              parser = new TimesParser();

              break;
            }
            default: {
              throw new Error("Impossible.");
            }
          }

          const recipe = await parser.load();

          sendResponse({
            type: "RECIPE_DATA",
            sender: "recipe-scraper",
            payload: {
              recipe,
            },
          });
        };

        getAndSendRecipe(sendResponse);

        return true;
      }

      break;
    }
  }
});
