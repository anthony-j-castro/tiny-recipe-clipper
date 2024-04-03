import { sendMessageToBackground } from "~/chrome-helpers";
import instantiateScraper from "~/content-scripts/recipe-scraper/utils/instantiateScraper";
import { receivableRecipeScraperMessageDecoder } from "~/messages/decoders";
import isRecipePage from "~/utils/isRecipePage";
import isSupportedWebsite from "~/utils/isSupportedWebsite";

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
        const getAndSendRecipe = async () => {
          const scraper = instantiateScraper(window.location.href);

          if (scraper === undefined) {
            throw new Error("Impossible!");
          }

          const recipe = await scraper.load();

          switch (message.payload.destination) {
            case "popup": {
              sendResponse({
                type: "RECIPE_DATA",
                sender: "recipe-scraper",
                payload: {
                  recipe,
                },
              });
              break;
            }
            case "service-worker": {
              sendMessageToBackground({
                type: "SEND_RECIPE_DATA",
                sender: "recipe-scraper",
                payload: {
                  recipe,
                },
              });

              break;
            }
          }
        };

        // Because we are performing an asynchronous action,
        // we need to return true in order to use sendResponse asynchronously.
        // See: https://developer.chrome.com/docs/extensions/develop/concepts/messaging#simple
        getAndSendRecipe();

        return true;
      }

      sendResponse(undefined);

      return;
    }
  }
});
