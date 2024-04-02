import { Scraper } from "~/content-scripts/recipe-scraper/scrapers";
import TimesScraper from "~/content-scripts/recipe-scraper/scrapers/cooking.nytimes.com";
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
        const { hostname } = new URL(window.location.href);

        const getAndSendRecipe = async (
          sendResponse: (response: unknown) => void,
        ) => {
          let scraper: Scraper;

          switch (hostname) {
            case "cooking.nytimes.com": {
              scraper = new TimesScraper();

              break;
            }
            default: {
              throw new Error("Impossible.");
            }
          }

          const recipe = await scraper.load();

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

      sendResponse(undefined);

      return;
    }
  }
});
